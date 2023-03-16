package com.myticket.myticket.auth.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;
import com.myticket.myticket.user.repository.UserRepository;

import com.myticket.myticket.auth.dto.TokenDto;
import com.myticket.myticket.jwt.JwtTokenProvider;
import com.myticket.myticket.jwt.Enum.JwtEnum;
import com.myticket.myticket.user.Enum.UserEnumType;
import com.myticket.myticket.vo.User;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AuthService {
    
    private final PasswordEncoder encoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;

    @Transactional
    public TokenDto authenticate(String id, String password) {

        User findUser = userRepository.findById(id);
        if(findUser == null) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, UserEnumType.LOGIN_FAIL.getMessage());
        }
        if(!encoder.matches(password, findUser.getPassword())) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, UserEnumType.LOGIN_FAIL.getMessage());
        }
        // 받아온 유저네임과 패스워드를 이용해 UsernamePasswordAuthenticationToken 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(id, password);

        // authenticationToken 객체를 통해 Authentication 객체 생성
        // 이 과정에서 CustomUserDetailsService 에서 우리가 재정의한 loadUserByUsername 메서드 호출
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 그 객체를 시큐리티 컨텍스트에 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // 인증 정보를 기준으로 jwt access 토큰 생성
        String accessToken = jwtTokenProvider.createToken(authentication);
        String refreshToken = jwtTokenProvider.createRefreshToken(authentication);

        //update refresh token
        findUser.updateRefreshToken(refreshToken);

        return new TokenDto(accessToken, refreshToken); 
    }

    public TokenDto reGenerateRefreshToken(String refreshToken) {

        JwtEnum jwtEnum = jwtTokenProvider.validateRefreshToken(refreshToken);
        if(jwtEnum == JwtEnum.ACCESS) {
            User findUser = userRepository.findByRefreshToken(refreshToken);
            Authentication authentication = jwtTokenProvider.getAuthenticationByRefresh(refreshToken);

            if(findUser == null || !findUser.getId().equals(authentication.getName())) {
                throw new UsernameNotFoundException(UserEnumType.USER_NOT_FOUND.getMessage());
            }
            String accessToken = jwtTokenProvider.createToken(authentication);
            System.out.println("findUser : "+ findUser);
            System.out.println("authentication : "+ authentication);
            return new TokenDto(accessToken, refreshToken);
        } else if (jwtEnum == JwtEnum.EXPIRED) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, UserEnumType.USER_RE_LOGIN.getMessage());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, UserEnumType.LOGIN_FAIL.getMessage());
        }
    }

}
