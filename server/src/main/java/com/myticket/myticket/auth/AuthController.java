package com.myticket.myticket.auth;

import java.security.Principal;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myticket.myticket.user.dto.AuthUserDto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping(value = "api/v1/auth")
public class AuthController {
    
    // private AuthenticationManager authenticationManager;

    @PostMapping(value = "/signin")
    public String signin(@RequestBody AuthUserDto authUserDto){

        System.out.println("auth : "+authUserDto);

        return "";
    }
}
