package com.myticket.myticket.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/*
 * JwtConfig는 JWT 설정파일로 TokenProvider에 의존성을 주입하고 빈을 생성하는 역할을 수행합니다.
 */
@Configuration
public class JwtConfig {
    
    @Value("${jwt.token.key}")
    private String accessTokenSecretKey;
    private Long accessTokenValidityInSeconds = 240*60L;
    @Value("${jwt.token.name}")
    private String accessTokenName;

    @Bean(name = "JwtTokenProvider")
    public JwtTokenProvider jwtTokenProvider(){
        return new JwtTokenProvider(accessTokenName, accessTokenSecretKey, accessTokenValidityInSeconds);
    }
}
