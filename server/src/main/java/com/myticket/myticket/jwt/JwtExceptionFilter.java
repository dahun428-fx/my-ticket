package com.myticket.myticket.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import io.jsonwebtoken.JwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.OncePerRequestFilter;

import com.myticket.myticket.jwt.Enum.JwtEnum;

public class JwtExceptionFilter extends OncePerRequestFilter {

    protected final Logger logger = LoggerFactory.getLogger(JwtExceptionFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (JwtException e) {
            if (e.getMessage().equals(JwtEnum.EXPIRED.getStatus())) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, JwtEnum.EXPIRED.getStatus());
            } else {
                logger.info("JwtExeption : error 발생, {}", HttpServletResponse.SC_UNAUTHORIZED);
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, JwtEnum.DENIED.getStatus());
            }
        }
    }

}
