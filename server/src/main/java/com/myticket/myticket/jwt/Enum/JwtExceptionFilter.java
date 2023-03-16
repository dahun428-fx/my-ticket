package com.myticket.myticket.jwt.Enum;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import io.jsonwebtoken.JwtException;
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
        } catch (JwtException e) {
            logger.info("not available jwtfileter");
            if (e.getMessage().equals(JwtEnum.EXPIRED.getStatus())) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, JwtEnum.EXPIRED.getStatus());
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, JwtEnum.DENIED.getStatus());
            }
        }
    }

    // public void setErrorResponse(HttpStatus status, HttpServletResponse res,
    // Throwable ex) throws IOException {
    // res.setStatus(status.value());
    // res.setContentType("application/json; charset=UTF-8");

    // JwtExceptionRespo jwtExceptionResponse = new
    // JwtExceptionResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    // res.getWriter().write(jwtExceptionResponse.convertToJson());
    // }
}
