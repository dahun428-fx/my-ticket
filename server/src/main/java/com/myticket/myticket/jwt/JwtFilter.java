package com.myticket.myticket.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import com.myticket.myticket.jwt.Enum.JwtEnum;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.AllArgsConstructor;

@AllArgsConstructor
// 실질적으로 액세스토큰을 검증하는 역할을 수행하는 GenericFilterBean을 상속받아 JwtFilter
// GenericFilterBean => OncePerRequestFilter
public class JwtFilter extends OncePerRequestFilter {

    protected final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    public static final String AUTHORIZATION_HEADER = "Authorization";

    private JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String accessToken = resolveToken(httpServletRequest);
        String requestURI = httpServletRequest.getRequestURI();

        // JwtEnum jwtEnum = jwtTokenProvider.validateToken(jwt);
        if (StringUtils.hasText(accessToken) && jwtTokenProvider.validateToken(accessToken)) {
            // 토큰에서 유저네임, 권한을 뽑아 스프링 시큐리티 유저를 만들어 Authentication 반환
            Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
            // 해당 스프링 시큐리티 유저를 시큐리티 건텍스트에 저장, 즉 디비를 거치지 않음
            SecurityContextHolder.getContext().setAuthentication(authentication);

            logger.info("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);

        } else {
            logger.info("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
        }

        chain.doFilter(request, response);
    }

    // 헤더에서 토큰 정보를 꺼내온다.
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}
