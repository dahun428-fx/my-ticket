package com.myticket.myticket.auth.controller;

import java.util.Map;

import javax.servlet.http.Cookie;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myticket.myticket.auth.dto.TokenDto;
import com.myticket.myticket.auth.Enum.ProviderType;
import com.myticket.myticket.auth.dto.LoginUserDto;
import com.myticket.myticket.auth.dto.OAuth2UserInfo;
import com.myticket.myticket.auth.service.AuthService;
import com.myticket.myticket.auth.util.OAuth2UserInfoFactory;
import com.myticket.myticket.jwt.JwtFilter;
import com.myticket.myticket.vo.User;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping(value = "api/v1/auth")
public class AuthController {

    protected final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private AuthService authService;

    // login
    @PostMapping(value = "/authenticate")
    public ResponseEntity<TokenDto> signIn(@RequestBody LoginUserDto loginUserDto) {
        TokenDto tokenDto = authService.login(loginUserDto.getId(), loginUserDto.getPassword());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenDto.getAccessToken());
        httpHeaders.add(JwtFilter.REFRESH_HEADER, tokenDto.getRefreshToken());
        logger.info("LocalLogin token 발급, {}", tokenDto);
        return new ResponseEntity<>(tokenDto, httpHeaders, HttpStatus.OK);
    }

    // refresh
    @PostMapping(value = "/refresh")
    public ResponseEntity<TokenDto> refreshToken(@RequestHeader(JwtFilter.REFRESH_HEADER) String refreshToken) {
        TokenDto tokenDto = authService.reGenerateAccessToken(refreshToken);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenDto.getAccessToken());
        logger.info("refresh token 발급, {}", tokenDto);

        return new ResponseEntity<>(tokenDto, httpHeaders, HttpStatus.OK);
    }

    @PostMapping(value = "/oauth")
    public ResponseEntity<TokenDto> oauth(@AuthenticationPrincipal User loadUser, @RequestBody Map<String, Object> VO) {
        logger.info("oauth loadUser Controller , {}", loadUser);
        ProviderType providerType = ProviderType.valueOf(VO.get("provider").toString().toUpperCase());
        OAuth2UserInfo user = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType,
                (Map<String, Object>) VO.get("user"));

        TokenDto tokenDto = authService.oAuthLogin(user);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenDto.getAccessToken());
        httpHeaders.add(JwtFilter.REFRESH_HEADER, tokenDto.getRefreshToken());
        logger.info("oAuth2Login token 발급, {}", tokenDto);

        return new ResponseEntity<>(tokenDto, httpHeaders, HttpStatus.OK);
    }

    @PostMapping(value = "/add/provider")
    public ResponseEntity<String> addProvider(
            @RequestBody Map<String, Object> VO) {
        System.out.println("VO : " + VO);
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currentUserId = userDetails.getUsername();
        System.out.println("user : " + currentUserId);
        ProviderType providerType = ProviderType.valueOf(VO.get("provider").toString().toUpperCase());
        OAuth2UserInfo user = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType,
                (Map<String, Object>) VO.get("user"));
        authService.addOAuthProviderForExistUser(currentUserId, user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 연동 sign up --> signin --> 자동 로그인 연동 버튼 클릭 --> OAuth2 로그인 성공 -->

    // OAuth 파라미터 전달 + 기존 userId 전달 --> Provider 등록 ( 기존 id 로 )
    // 기존아이디 + OAuth2 아이디

    // user update 페이지 --> axios get user 정보 --> user / provider 정보
    // --> 저장된 provider 없으면, 연동 가능한 provider 리스트 출력
    // --> provider 버튼 클릭 --> signin 함수 수행
    // --> spring context id 에 user.id 저장
    // -->
}
