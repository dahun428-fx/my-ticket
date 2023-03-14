package com.myticket.myticket.jwt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

/*
 * AccessDeniedHandler는 권한 체크 후 인가 실패 시 
 * 동작하도록 시큐리티 설정파일에 설정할 예정입니다.
   AccessDeniedHandler를 상속받아 구현합니다.
 */
@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {
    
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.sendError(HttpServletResponse.SC_FORBIDDEN);
    }
}
