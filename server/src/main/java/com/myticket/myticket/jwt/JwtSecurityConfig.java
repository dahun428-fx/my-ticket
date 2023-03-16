package com.myticket.myticket.jwt;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.myticket.myticket.jwt.Enum.JwtExceptionFilter;

import lombok.AllArgsConstructor;

/*
 * JwtSecurityConfig는 
 * SecurityConfigurerAdapter를 상속받아 구현합니다.
    TokenProvider를 주입받아 JwtFilter를 통해 시큐리티 로직에 등록하는 역할을 수행합니다.
 */
@AllArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    
    private JwtTokenProvider jwtTokenProvider;

    public void configure(HttpSecurity http) {
        JwtFilter customFilter = new JwtFilter(jwtTokenProvider);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
        // JwtExceptionFilter exceptionFilter = new JwtExceptionFilter();
        // http.addFilterBefore(exceptionFilter, JwtFilter.class);
    }
}
