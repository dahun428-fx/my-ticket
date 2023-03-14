package com.myticket.myticket.common.util;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.NoArgsConstructor;

/*
 * 인증 API를 직접 호출할 때를 제외하고
 * JwtFilter를 통과할 때 토큰에서 정보를 받아 
 * 스프링 시큐리티에 인증 정보를 저장할 때는 loadUserByUsername를 호출하지 않기에 
 * 실제로 디비에 사용자가 존재하는지 별도로 Account를 디비에서 조회해주어야 합니다.
이를 위해 편리하게 스프링 시큐리티에서 username을 꺼내주는 유틸을 작성하려고 합니다.
security context에 저장된 Authentication 객체를 
이용해 username을 리턴해주는 유틸을 작성합니다.
security context에 authentication 
객체가 저장되는 시점은 토큰 검증을 수행하는 JwtFilter의 doFilter 영역입니다.
 */
@NoArgsConstructor
public class SecurityUtil {
    
    protected static final Logger logger = LoggerFactory.getLogger(SecurityUtil.class);

    public static Optional<String> getCurrentUserId(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null) {
            logger.debug("Security Context에 인증 정보가 없습니다.");
            return Optional.empty();
        }

        String userid = null;
        if(authentication.getPrincipal() instanceof UserDetails) {
            UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
            userid = springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof String) {
            userid = (String) authentication.getPrincipal();
        }
        return Optional.ofNullable(userid);
    }

}
