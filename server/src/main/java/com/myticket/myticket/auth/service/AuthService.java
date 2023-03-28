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
    public TokenDto oAuthExcute(OAuth2UserInfo oAuth2UserInfo){

        User findUser = userRepository.findById(oAuth2UserInfo.getEmail());
        if(findUser == null) {
            logger.info("oAuthExcute, 회원가입이 필요한 유저입니다., {}", oAuth2UserInfo.getId());
            User user = User.builder()
                            .id(oAuth2UserInfo.getEmail())
                            .name(oAuth2UserInfo.getName())
                            .password("")
                            .roleType(UserRoleType.ROLE_USER)
                            .build();
            userRepository.save(user);
            findUser = user;
        } 
        AuthProvider foundAuthProvider = providerRepository.findByUser_idAndType(findUser.getId(), oAuth2UserInfo.getProviderType().ordinal());
        if(foundAuthProvider == null) {
            AuthProvider authProvider = AuthProvider.builder()
                .user(findUser)
                .providerName(oAuth2UserInfo.getProviderType().name())
                .providerType(oAuth2UserInfo.getProviderType().ordinal())
                .build();
            providerRepository.save(authProvider);
        }

        Authentication authentication = this.createOAuth2Authentication(findUser);
        String accessToken = jwtTokenProvider.createToken(authentication);
        Long accessTokenExpiry = jwtTokenProvider.getAccessTokenExpiry();
        String refreshToken = jwtTokenProvider.createRefreshToken(authentication);

        findUser.updateRefreshToken(refreshToken);

        return new TokenDto(accessToken, refreshToken, accessTokenExpiry);
    }


    @Transactional
    public TokenDto authenticate(String id, String password) {

        User findUser = userRepository.findById(id);
        if (findUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, UserEnumType.LOGIN_FAIL.getMessage());
        }
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

    //oAuth2
    private Authentication createOAuth2Authentication(User user){
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getId(), null, List.of(new SimpleGrantedAuthority(user.getRoleType().name())));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authentication;
    }
}
