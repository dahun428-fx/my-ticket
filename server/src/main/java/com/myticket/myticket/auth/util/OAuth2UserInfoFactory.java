package com.myticket.myticket.auth.util;

import java.util.Map;

import com.myticket.myticket.auth.Enum.ProviderType;
import com.myticket.myticket.auth.dto.FacebookOAuth2UserInfo;
import com.myticket.myticket.auth.dto.GithubOAuth2UserInfo;
import com.myticket.myticket.auth.dto.GoogleOAuth2UserInfo;
import com.myticket.myticket.auth.dto.KakaoOAuth2UserInfo;
import com.myticket.myticket.auth.dto.NaverOAuth2UserInfo;
import com.myticket.myticket.auth.dto.OAuth2UserInfo;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(ProviderType providerType, Map<String, Object> attributes){
        switch(providerType) {
            case GOOGLE: return new GoogleOAuth2UserInfo(attributes, providerType);
            case GITHUB: return new GithubOAuth2UserInfo(attributes, providerType);
            case FACEBOOK: return new FacebookOAuth2UserInfo(attributes, providerType);
            case KAKAO: return new KakaoOAuth2UserInfo(attributes, providerType);
            case NAVER: return new NaverOAuth2UserInfo(attributes, providerType);
            default : throw new IllegalArgumentException("Invalid Provide Type");
        }
    }
}
