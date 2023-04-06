package com.myticket.myticket.auth.dto;

import java.util.Map;

import com.myticket.myticket.auth.Enum.ProviderType;

public class NaverOAuth2UserInfo extends OAuth2UserInfo {
    
    private ProviderType providerType;

    public NaverOAuth2UserInfo(Map<String, Object> attributes, ProviderType providerType) {
        super(attributes, providerType);
        this.providerType = providerType;
    }

    @Override
    public String getId() {
        String id = null;
        if(attributes.get("id") instanceof Integer) {
            id = String.valueOf(attributes.get("id"));
        } else {
            id = (String) attributes.get("id");
        }
        return id;
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("image");
    }

    @Override
    public ProviderType getProviderType() {
        return providerType;
    }
}
