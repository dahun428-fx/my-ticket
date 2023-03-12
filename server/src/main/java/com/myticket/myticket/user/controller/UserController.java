package com.myticket.myticket.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.myticket.myticket.user.dto.CreateUserDto;

@EnableWebMvc
@RestController
@RequestMapping("api/user")
public class UserController {

    @PostMapping("/create")
    public ResponseEntity<String> singup(@RequestBody CreateUserDto createUserDto) {
        System.out.println("createUserDto : " + createUserDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
