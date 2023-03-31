package com.myticket.myticket.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.filter.CorsFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.myticket.myticket.auth.handler.OAuth2AuthenticationFailureHandler;
import com.myticket.myticket.auth.handler.OAuth2AuthenticationSuccessHandler;
import com.myticket.myticket.jwt.JwtAccessDeniedHandler;
import com.myticket.myticket.jwt.JwtAuthenticationEntryPoint;
import com.myticket.myticket.jwt.JwtSecurityConfig;
import com.myticket.myticket.jwt.JwtTokenProvider;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true) // @PreAuthorize 어노테이션 사용을 위해 선언
public class SpringSecurityConfigWithJwt {

    private final JwtTokenProvider tokenProvider;
    private final CorsFilter corsFilter;
    private final JwtAuthenticationEntryPoint entryPoint;
    private final JwtAccessDeniedHandler accessDeniedHandler;
    // private final CustomOAuth2UserService auth2UserService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

    // filter 제외 item
    // public void configure(WebSecurity web) {
    // web.ignoring()
    // .antMatchers("/error", "/favicon.ico");
    // }
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> {
            web.ignoring()
                    .antMatchers("/error", "/favicon.ico");
        };
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .formLogin()
                .disable()
                .httpBasic()
                .disable()
                .csrf()
                .disable()
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                // custom error handler injection
                .exceptionHandling()
                .authenticationEntryPoint(entryPoint)
                .accessDeniedHandler(accessDeniedHandler)
                // not use session
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                // api url
                .and()
                .authorizeHttpRequests()
                .antMatchers("/").permitAll()
                // .antMatchers("/api/user/login").permitAll()
                .antMatchers("/api/v1/user/signup").permitAll()
                .antMatchers("/api/v1/auth/authenticate").permitAll()// allow no need jwt
                .antMatchers("/api/v1/auth/refresh").permitAll()// allow no need jwt
                .antMatchers("/api/v1/auth/oauth").permitAll()// allow no need jwt
                .anyRequest()
                .authenticated()// 나머지 jwt 인증 필요
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));// JwtSecurityConfig access
        return http.build();
    }
}
