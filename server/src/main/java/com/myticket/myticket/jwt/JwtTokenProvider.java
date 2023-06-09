package com.myticket.myticket.jwt;

import java.security.Key;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.server.ResponseStatusException;

import com.myticket.myticket.jwt.Enum.JwtEnum;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;

/*
 * TokenProvider는 토큰을 생성하고 검증하며 
 * 토큰에서 정보를 꺼내 스프링 시큐리티 Authentication 객체를 생성하는 역할을 수행합니다.
 */
public class JwtTokenProvider {

    protected final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    protected final String secretKey;
    protected final String tokenName;

    protected final Long tokenValidityInMilliseconds;
    protected final Long refreshTokenValidityMilliseconds;
    protected Long accessTokenExpiry;
    protected Key key;

    public JwtTokenProvider(String tokenName, String secretKey, long tokenValidityInMilliseconds,
            long refreshTokenValidityMilliseconds) {

        this.tokenName = tokenName;
        this.secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        this.tokenValidityInMilliseconds = tokenValidityInMilliseconds;
        this.refreshTokenValidityMilliseconds = refreshTokenValidityMilliseconds;
        this.accessTokenExpiry = (new Date()).getTime() + tokenValidityInMilliseconds;
        byte[] keyBytes = secretKey.getBytes();
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public Long getAccessTokenExpiry() {
        return this.accessTokenExpiry;
    }

    public void setAccessTokenExpiry(Long tokenValidityInMilliseconds) {
        long now = (new Date()).getTime();
        Long expiry = now + tokenValidityInMilliseconds;
        this.accessTokenExpiry = expiry;
    }

    // create jwt token
    public String createToken(Authentication authentication) {
        // get User Role --> to "...,..."
        String authorities = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        // payload setting
        // now : start time
        // long now = (new Date()).getTime();
        // validity : expired time
        setAccessTokenExpiry(tokenValidityInMilliseconds);
        Date validity = new Date(accessTokenExpiry);
        // Date validity = new Date(now + this.tokenValidityInMilliseconds);

        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim(tokenName, authorities)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    public String createRefreshToken(Authentication authentication) {
        String authorities = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        long now = (new Date()).getTime();
        Date validity = new Date(now + this.refreshTokenValidityMilliseconds);

        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim(tokenName, authorities)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    // return to authentication object
    public Authentication getAuthentication(String token) {
        // token to claims
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get(tokenName).toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        // 디비를 거치지 않고 토큰에서 값을 꺼내 바로 시큐리티 유저 객체를 만들어 Authentication을 만들어 반환하기에 유저네임, 권한 외
        // 정보는 알 수 없다.
        // security user
        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    // token valid check
    public boolean validateToken(String token) {
        logger.info("토큰 검증 :: {}", token);
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
            logger.info("유효한 JWT 서명 입니다. {}", claims);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            logger.info("잘못된 JWT 서명 입니다.");
            throw new JwtException(JwtEnum.DENIED.getStatus());
        } catch (ExpiredJwtException e) {
            logger.info("만료된 JWT 토큰 입니다.");
            throw new JwtException(JwtEnum.EXPIRED.getStatus());
        } catch (UnsupportedJwtException e) {
            logger.info("지원되지 않는 JWT 토큰 입니다.");
            throw new JwtException(JwtEnum.DENIED.getStatus());
        } catch (IllegalArgumentException e) {
            logger.info("JWT 토큰이 잘못 되었습니다.");
            throw new JwtException(JwtEnum.DENIED.getStatus());
        }
    }

}
