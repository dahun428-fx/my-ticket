package com.myticket.myticket.auth.dto;

import java.util.Map;

import com.myticket.myticket.auth.Enum.ProviderType;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {
    
    private ProviderType providerType;

    public GoogleOAuth2UserInfo(Map<String, Object> attributes, ProviderType providerType) {
        super(attributes, providerType);
        this.providerType=providerType;
    }

    @Override
    public String getId() {
        return (String) attributes.get("id");
    }

    public String getName(){
        return (String) attributes.get("name");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("image");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    public ProviderType getProviderType() {
        return providerType;
    }

    
}
