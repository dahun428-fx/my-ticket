package com.myticket.myticket.jwt.Enum;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtExceptionFilter extends OncePerRequestFilter {
    
    protected final Logger logger = LoggerFactory.getLogger(JwtExceptionFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
            logger.info("available jwtfileter");
        } catch (Exception e) {
            logger.info("not available jwtfileter", e);
        }
    }
}
