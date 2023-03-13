package com.myticket.myticket.user.dto;

import com.myticket.myticket.user.Enum.UserRoleType;

import lombok.Data;

@Data
public class CreateUserDto {
    private Long no;
    private String id;
    private String name;
    private String password;
    private UserRoleType roleType;
}
