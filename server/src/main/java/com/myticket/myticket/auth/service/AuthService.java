package com.myticket.myticket.auth.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;
import com.myticket.myticket.user.repository.UserRepository;
import com.myticket.myticket.auth.Enum.ProviderType;
import com.myticket.myticket.auth.dto.OAuth2UserInfo;
import com.myticket.myticket.auth.dto.TokenDto;
import com.myticket.myticket.auth.repository.AuthProviderRepository;
import com.myticket.myticket.auth.vo.AuthProvider;
import com.myticket.myticket.jwt.JwtTokenProvider;
import com.myticket.myticket.jwt.Enum.JwtEnum;
import com.myticket.myticket.user.Enum.UserEnumType;
import com.myticket.myticket.user.Enum.UserRoleType;
import com.myticket.myticket.vo.User;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AuthService {

    protected final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final PasswordEncoder encoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final AuthProviderRepository providerRepository;

    @Transactional
    public void signOut(String userid) {
        User findUser = userRepository.findById(userid);
        if(findUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, UserEnumType.USER_NOT_FOUND.getMessage());
        }
        findUser.updateRefreshToken("");
    }

    /*
     * 먼저 가입을 시킨다 --> db 에는 이메일 or auth id 로 (카카오)
     * 기존 provider 와 연동 되어있는 유저,
     * provider 만 가입되어 있는 유저.
     * 
     */
    @Transactional
    public TokenDto oAuthLogin(OAuth2UserInfo oAuth2UserInfo) {
        User resultUser = null;
        AuthProvider findProvider = providerRepository.findByIdAndType(oAuth2UserInfo.getId(),
                oAuth2UserInfo.getProviderType().getType());
        // provider 여부 확인 --> 없는 경우 가입
        if (findProvider == null) {
            logger.info("oAuthLogin, 회원가입이 필요한 유저입니다., oAuth2UserInfo : {}", oAuth2UserInfo);

            // user id 중에 중복된 email이 존재한다면, provider 만 등록
            User checkUser = userRepository.findById(oAuth2UserInfo.getEmail());
            if (checkUser == null) {
                //Provider 회원 가입 --> id : email
                String makeUserId = this.setUserIdByOAuth2User(oAuth2UserInfo, oAuth2UserInfo.getEmail());
                User signUpUser = User.builder()
                        .id(makeUserId)
                        .name(this.setUserIdByOAuth2User(oAuth2UserInfo, oAuth2UserInfo.getName()))
                        .password("")
                        .roleType(UserRoleType.ROLE_OAUTH2)
                        .build();
                userRepository.save(signUpUser);
                checkUser = signUpUser;
                logger.info("oAuthLogin, 회원 등록 완료 , oAuth2UserInfo : {}", signUpUser);
            }

            AuthProvider authProvider = AuthProvider.builder()
                    .user(checkUser)
                    .providerName(oAuth2UserInfo.getProviderType().name())
                    .providerEmail(oAuth2UserInfo.getEmail())
                    .providerId(oAuth2UserInfo.getId())
                    .providerType(oAuth2UserInfo.getProviderType().getType())
                    .build();
            providerRepository.save(authProvider);
            resultUser = checkUser;
        // provider 있는 경우
        } else {
            User findUser = userRepository.findById(findProvider.getUser().getId());
            logger.info("oAuthExcute, 회원 가입이 되어 있는 유저 입니다 , User : {}", findUser);
            resultUser = findUser;
        }

        Authentication authentication = this.createOAuth2Authentication(resultUser);
        String accessToken = jwtTokenProvider.createToken(authentication);
        Long accessTokenExpiry = jwtTokenProvider.getAccessTokenExpiry();
        String refreshToken = jwtTokenProvider.createRefreshToken(authentication);

        resultUser.updateRefreshToken(refreshToken);

        return new TokenDto(accessToken, refreshToken, accessTokenExpiry);
    }

    public void addOAuthProviderForExistUser(String existUserid, OAuth2UserInfo oAuth2UserInfo) {
        User findUser = userRepository.findById(existUserid);

        AuthProvider foundAuthProvider = providerRepository.findByUser_idAndType(findUser.getId(),
                oAuth2UserInfo.getProviderType().getType());
        if (foundAuthProvider == null) {
            AuthProvider authProvider = AuthProvider.builder()
                    .user(findUser)
                    .providerName(oAuth2UserInfo.getProviderType().name())
                    .providerEmail(oAuth2UserInfo.getEmail())
                    .providerId(oAuth2UserInfo.getId())
                    .providerType(oAuth2UserInfo.getProviderType().getType())
                    .build();
            providerRepository.save(authProvider);
        }
    }

    @Transactional
    public TokenDto login(String id, String password) {

        User findUser = userRepository.findById(id);
        //유저 확인
        if (findUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, UserEnumType.LOGIN_FAIL.getMessage());
        }
        // SNS 로그인 체크
        AuthProvider findProvider = providerRepository.findByUser_idAndType(id, ProviderType.LOCAL.getType());
        logger.info("oAuthExcute, SNS 로그인 여부 확인 , User : {}", findProvider);
        if (findProvider == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, UserEnumType.LOGIN_FAIL_SNS.getMessage());
        }
        //비밀번호 확인
        if (!encoder.matches(password, findUser.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, UserEnumType.LOGIN_FAIL.getMessage());
        }
        Authentication authentication = this.createAuthentication(id, password);
        // 인증 정보를 기준으로 jwt access 토큰 생성
        String accessToken = jwtTokenProvider.createToken(authentication);
        Long accessTokenExpiry = jwtTokenProvider.getAccessTokenExpiry();
        String refreshToken = jwtTokenProvider.createRefreshToken(authentication);

        // update refresh token
        findUser.updateRefreshToken(refreshToken);

        return new TokenDto(accessToken, refreshToken, accessTokenExpiry);
    }

    @Transactional
    public TokenDto reGenerateAccessToken(String refreshToken) {

        try {
            if (StringUtils.hasText(refreshToken) && jwtTokenProvider.validateToken(refreshToken)) {
                User findUser = userRepository.findByRefreshToken(refreshToken);
                if (findUser == null) {
                    throw new UsernameNotFoundException(UserEnumType.USER_NOT_FOUND.getMessage());
                }
                Authentication authentication = jwtTokenProvider.getAuthentication(refreshToken);
                Long accessTokenExpiry = jwtTokenProvider.getAccessTokenExpiry();
                String accessToken = jwtTokenProvider.createToken(authentication);
                return new TokenDto(accessToken, refreshToken, accessTokenExpiry);
            }

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, JwtEnum.EXPIRED.getStatus());
        }

        return null;
    }

    private Authentication createAuthentication(String id, String password) {
        // 받아온 유저네임과 패스워드를 이용해 UsernamePasswordAuthenticationToken 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(id, password);

        // authenticationToken 객체를 통해 Authentication 객체 생성
        // 이 과정에서 CustomUserDetailsService 에서 우리가 재정의한 loadUserByUsername 메서드 호출
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 그 객체를 시큐리티 컨텍스트에 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return authentication;
    }

    // oAuth2
    private Authentication createOAuth2Authentication(User user) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getId(), null,
                List.of(new SimpleGrantedAuthority(user.getRoleType().name())));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authentication;
    }

    private String setUserIdByOAuth2User(OAuth2UserInfo userInfo, String target) {
        String userid = target;
        if (!StringUtils.hasText(userid)) {
            StringBuilder builder = new StringBuilder();
            builder.append(userInfo.getProviderType().name()).append("_").append(userInfo.getId());
            userid = builder.toString();
        }
        return userid;
    }
}
