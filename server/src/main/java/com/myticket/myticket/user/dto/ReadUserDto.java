package com.myticket.myticket.user.dto;

import com.myticket.myticket.auth.Enum.ProviderType;
import com.myticket.myticket.user.Enum.UserRoleType;

import lombok.Data;

@Data
public class ReadUserDto {
    private Long no;
    private String id;
    private String name;
    private UserRoleType roleType;
    private ProviderType providerType;
}
