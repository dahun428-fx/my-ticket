package com.myticket.myticket.auth.controller;

import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    private PasswordEncoder encoder;

    // login
    @PostMapping(value = "/authenticate")
    public ResponseEntity<TokenDto> signIn(@RequestBody LoginUserDto loginUserDto) {

        TokenDto tokenDto = authService.authenticate(loginUserDto.getId(), loginUserDto.getPassword());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenDto.getAccessToken());

        return new ResponseEntity<>(tokenDto, httpHeaders, HttpStatus.OK);
    }

    @PostMapping(value = "/refresh")
    public ResponseEntity<TokenDto> refreshToken(@RequestBody Map<String, String> refreshMap) {
        String refreshToken = (String) refreshMap.get("refresh");
        System.out.println("refreshToken : " + refreshToken);

        TokenDto tokenDto = authService.reGenerateAccessToken(refreshToken);
        System.out.println("tokenDto : " + tokenDto);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenDto.getAccessToken());

        return new ResponseEntity<>(tokenDto, httpHeaders, HttpStatus.OK);
    }
}
