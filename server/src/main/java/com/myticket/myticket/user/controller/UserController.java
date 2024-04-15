package com.myticket.myticket.user.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import com.myticket.myticket.user.service.UserService;
import com.myticket.myticket.auth.dto.ReadProviderDto;
import com.myticket.myticket.user.dto.CreateUserDto;
import com.myticket.myticket.user.dto.ReadUserDto;

import lombok.AllArgsConstructor;

@EnableWebMvc
@RestController
@RequestMapping(value = "api/v1/user")
@AllArgsConstructor
public class UserController {

    protected final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<CreateUserDto> signUp(@RequestBody CreateUserDto createUserDto) {
        CreateUserDto createdUser = userService.addUser(createUserDto);
        return ResponseEntity.ok().body(createdUser);
    }
    
    @GetMapping("/getProviderInfo")
    public ResponseEntity<List<ReadProviderDto>> getProviderInfo(@AuthenticationPrincipal User user){
        logger.info("getProviderInfo Controller , {}", user);
        List<ReadProviderDto> list = userService.getProviderInfo(user.getUsername());

        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/findUserInfo")
    public ResponseEntity<ReadUserDto> findUserInfo(@AuthenticationPrincipal User user) {
        logger.info("findUserInfo Controller , {}", user);
        ReadUserDto readUser = new ReadUserDto();
        readUser.setId(user.getUsername());
        ReadUserDto findUser = userService.findUserById(readUser);
        return ResponseEntity.ok().body(findUser);
    }

    @GetMapping(value = "/getUser", produces = "application/json; charset=utf8")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN', 'ROLE_OAUTH2')")
    public ResponseEntity<ReadUserDto> getUser(@AuthenticationPrincipal User user, HttpServletRequest req) {
        logger.info("get User Controller , {}", user);
        ReadUserDto findUser = new ReadUserDto();
        findUser.setId(user.getUsername());
        
        return ResponseEntity.ok().body(findUser);
    }

    @PostMapping(value= "/passwordCheck")
    public ResponseEntity<Boolean> passwordCheck(@RequestBody CreateUserDto createUserDto) {
        boolean isTrue = userService.passwordCheck(createUserDto);
        return ResponseEntity.status(200).body(isTrue);
    }

    @PostMapping(value = "/passwordChange")
    public ResponseEntity<Boolean> passwordChange(@RequestBody CreateUserDto createUserDto) {
        boolean isTrue = userService.passwordChange(createUserDto);
        return ResponseEntity.status(200).body(isTrue);
    }
}
