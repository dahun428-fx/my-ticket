package com.myticket.myticket.user.service;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.myticket.myticket.user.Enum.UserEnumType;
import com.myticket.myticket.user.dto.CreateUserDto;
import com.myticket.myticket.user.dto.ReadUserDto;
import com.myticket.myticket.user.repository.UserRepository;
import com.myticket.myticket.vo.User;

import lombok.AllArgsConstructor;

import java.util.*;

@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {
    
    private final UserRepository userRepository;

    public User loadUserByUsername(String userid) throws UsernameNotFoundException {

        User findUser = userRepository.findById(userid);
        if(findUser == null) {
            throw new UsernameNotFoundException(UserEnumType.LOGIN_FAIL.getMessage());
        }
        findUser.setAuthorities(List.of(new SimpleGrantedAuthority(findUser.getRoleType().name())));
        System.out.println("user : "+ findUser);
        return findUser;
     }

    public CreateUserDto addUser(CreateUserDto createUserDto){
        User findUser = userRepository.findById(createUserDto.getId());
        if(findUser != null) {
            return null;
        }
        User user = new User();
        BeanUtils.copyProperties(createUserDto, user);

        userRepository.save(user);
        return createUserDto;
    }

    public ReadUserDto findUserById(ReadUserDto readUserDto){
        User findUser = userRepository.findById(readUserDto.getId());
        if(findUser == null) {
            return null;
        }
        BeanUtils.copyProperties(findUser, readUserDto);
        return readUserDto;
    }

    


    
}
