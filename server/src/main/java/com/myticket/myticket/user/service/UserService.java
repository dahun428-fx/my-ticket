package com.myticket.myticket.user.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.myticket.myticket.auth.Enum.ProviderType;
import com.myticket.myticket.auth.dto.ReadProviderDto;
import com.myticket.myticket.auth.repository.AuthProviderRepository;
import com.myticket.myticket.auth.vo.AuthProvider;
import com.myticket.myticket.common.util.Utils;
import com.myticket.myticket.user.Enum.UserEnumType;
import com.myticket.myticket.user.Enum.UserRoleType;
import com.myticket.myticket.user.dto.CreateUserDto;
import com.myticket.myticket.user.dto.ReadUserDto;
import com.myticket.myticket.user.repository.UserRepository;
import com.myticket.myticket.vo.User;

import lombok.AllArgsConstructor;

import java.util.*;

@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {
    
    protected final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final AuthProviderRepository providerRepository;
    private final PasswordEncoder encoder;

    public List<ReadProviderDto> getProviderInfo(String userid){
        List<AuthProvider> providerList = providerRepository.findByUser_id(userid);
        System.out.println("providerList  : "+providerList);
        List<ReadProviderDto> resultList = Utils.mapList(providerList, ReadProviderDto.class);
        return resultList;
    }

    @Transactional
    public CreateUserDto addUser(CreateUserDto createUserDto){
        User findUser = userRepository.findById(createUserDto.getId());
        if(findUser != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, UserEnumType.SIGN_UP_ALREADY_EXIST_USER.getMessage());
        }

        User user = User.builder()
                        .id(createUserDto.getId())
                        .name(createUserDto.getName())
                        .password(encoder.encode(createUserDto.getPassword()))
                        .roleType(UserRoleType.ROLE_USER)
                        .build();
        userRepository.save(user);
        AuthProvider authProvider = AuthProvider.builder()
                                            .user(user)
                                            .providerName(ProviderType.LOCAL.name())
                                            .providerType(ProviderType.LOCAL.getType())
                                            .build();
        providerRepository.save(authProvider);

        BeanUtils.copyProperties(user, createUserDto);
        createUserDto.setPassword("");
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

    /**
     * Spring Security
     */
    public User loadUserByUsername(String userid) throws UsernameNotFoundException {

        User findUser = userRepository.findById(userid);
        if(findUser == null) {
            throw new UsernameNotFoundException(UserEnumType.LOGIN_FAIL.getMessage());//401
        }
        findUser.setAuthorities(List.of(new SimpleGrantedAuthority(findUser.getRoleType().name())));
        logger.info("Spring Security loadUserByUserName : {}", findUser);

        return findUser;
     }


    
}
