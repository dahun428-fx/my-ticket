package com.myticket.myticket.auth.controller;

import java.util.Map;

import javax.servlet.http.Cookie;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myticket.myticket.auth.dto.TokenDto;
import com.myticket.myticket.auth.dto.LoginUserDto;
import com.myticket.myticket.auth.service.AuthService;
import com.myticket.myticket.jwt.JwtFilter;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping(value = "api/v1/auth")
public class AuthController {

    private AuthService authService;

    // login
    @PostMapping(value = "/authenticate")
    public ResponseEntity<TokenDto> signIn(@RequestBody LoginUserDto loginUserDto) {
        System.out.println("login attach user : "+loginUserDto);
        TokenDto tokenDto = authService.authenticate(loginUserDto.getId(), loginUserDto.getPassword());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenDto.getAccessToken());
        httpHeaders.add(JwtFilter.REFRESH_HEADER, tokenDto.getRefreshToken());

        return new ResponseEntity<>(tokenDto, httpHeaders, HttpStatus.OK);
    }

    // refresh
    @PostMapping(value = "/refresh")
    public ResponseEntity<TokenDto> refreshToken(@RequestHeader(JwtFilter.REFRESH_HEADER) String refreshToken) {

        TokenDto tokenDto = authService.reGenerateAccessToken(refreshToken);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenDto.getAccessToken());

        return new ResponseEntity<>(tokenDto, httpHeaders, HttpStatus.OK);
    }
}
