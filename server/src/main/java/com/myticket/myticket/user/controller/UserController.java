package com.myticket.myticket.user.controller;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import com.myticket.myticket.user.service.UserService;
import com.myticket.myticket.user.Enum.UserEnumType;
import com.myticket.myticket.user.dto.CreateUserDto;
import com.myticket.myticket.user.dto.ReadUserDto;

import lombok.AllArgsConstructor;

@EnableWebMvc
@RestController
@RequestMapping(value = "api/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder encoder;

    @PostMapping(value="/create", produces = "application/json; charset=utf8")
    public ResponseEntity<String> signUp(@RequestBody CreateUserDto createUserDto) {
        //encode password
        createUserDto.setPassword(encoder.encode(createUserDto.getPassword()));
        CreateUserDto createdUser = userService.addUser(createUserDto);
        if(createdUser == null) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, UserEnumType.SIGN_UP_ALREADY_EXIST_USER.getMessage());
        }
        return ResponseEntity.ok().body(UserEnumType.SIGN_UP_SUCCESS.getMessage());
    }

    @GetMapping(value="/login", produces = "application/json; charset=utf8")
    public ResponseEntity<ReadUserDto> signIn(@RequestBody ReadUserDto readUserDto) {
        ReadUserDto user = userService.findUserById(readUserDto);
        if(user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, UserEnumType.LOGIN_FAIL.getMessage());
        }
        return ResponseEntity.ok().body(user);
    }
}
