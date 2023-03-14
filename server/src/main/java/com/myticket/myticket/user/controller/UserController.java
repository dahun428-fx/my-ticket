package com.myticket.myticket.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import com.myticket.myticket.user.service.UserService;
import com.myticket.myticket.user.dto.CreateUserDto;
import com.myticket.myticket.user.dto.ReadUserDto;

import lombok.AllArgsConstructor;

@EnableWebMvc
@RestController
@RequestMapping(value = "api/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    // @PostMapping(value="/signup", produces = "application/json; charset=utf8")
    @PostMapping("/signup")
    public ResponseEntity<CreateUserDto> signUp(@RequestBody CreateUserDto createUserDto) {
        CreateUserDto createdUser = userService.addUser(createUserDto);
        return ResponseEntity.ok().body(createdUser);
    }

    // @GetMapping(value="/login", produces = "application/json; charset=utf8")
    // public ResponseEntity<ReadUserDto> signIn(@RequestBody ReadUserDto readUserDto) {
    //     ReadUserDto user = userService.findUserById(readUserDto);
    //     if(user == null) {
    //         throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, UserEnumType.LOGIN_FAIL.getMessage());
    //     }
    //     return ResponseEntity.ok().body(user);
    // }
    //auth check
    @GetMapping(value = "/getUser", produces = "application/json; charset=utf8")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<ReadUserDto> getUser(@AuthenticationPrincipal User user){
        // ReadUserDto findUser = new ReadUserDto();
        System.out.println("auth user : "+user);
        //  userService.loadUserByUsername(user.getUsername());
        // BeanUtils.copyProperties(user, findUser);

        // findUser = userService.findUserById(findUser);

        return ResponseEntity.ok().body(null);
    }

}
