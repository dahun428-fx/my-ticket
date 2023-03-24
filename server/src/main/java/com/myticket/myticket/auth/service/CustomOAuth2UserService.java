package com.myticket.myticket.auth.service;

import java.nio.file.attribute.UserPrincipal;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.myticket.myticket.auth.Enum.ProviderType;

// @Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // TODO Auto-generated method stub
        OAuth2User user = super.loadUser(userRequest);
        System.out.println("oauth user : "+user);

        return super.loadUser(userRequest);
    }

    // private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        
    //     ProviderType providerType = ProviderType.valueOf(
    //         userRequest.getClientRegistration().getRegistrationId().toUpperCase());

    //     OAuth2UserInfo
    // }

}
