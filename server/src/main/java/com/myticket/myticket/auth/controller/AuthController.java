package com.myticket.myticket.auth.controller;


import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myticket.myticket.auth.dto.AuthUser;
import com.myticket.myticket.auth.dto.LoginUserDto;
import com.myticket.myticket.auth.service.AuthService;
import com.myticket.myticket.jwt.JwtFilter;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping(value = "api/v1/auth")
public class AuthController {
    
    private AuthService authService;
    //login
    @PostMapping(value = "/authenticate")
    public ResponseEntity<AuthUser> signIn(@RequestBody LoginUserDto loginUserDto){

        AuthUser authUser = authService.authenticate(loginUserDto.getId(), loginUserDto.getPassword());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer "+authUser.getAccessToken());

        return new ResponseEntity<>(authUser, httpHeaders, HttpStatus.OK);
    }
}
