package com.myticket.myticket.auth.dto;

import java.util.Map;

import com.myticket.myticket.auth.Enum.ProviderType;

import lombok.ToString;

@ToString
public abstract class OAuth2UserInfo {

    protected Map<String, Object> attributes;
    protected ProviderType providerType;

    public OAuth2UserInfo(Map<String, Object> attributes, ProviderType providerType) {
        this.attributes = attributes;
        this.providerType = providerType;
    }

    public Map<String, Object> getAttributes(){
        return attributes;
    }

    public abstract String getId();
    public abstract String getName();
    public abstract String getEmail();
    public abstract String getImageUrl();
    public abstract ProviderType getProviderType();

}
