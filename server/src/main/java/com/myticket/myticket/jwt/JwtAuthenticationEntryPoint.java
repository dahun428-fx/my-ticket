package com.myticket.myticket.jwt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/*
 * AuthenticationEntryPoint는 인증 실패 시 동작하도록 시큐리티 설정파일 작성 시 지정할 예정입니다. 상속받아 구현합니다.
 */
// access fail
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    protected final Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
        logger.info("JwtAuthenticationEntryPoint, {} ", "SC_UNAUTHORIZED");
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
