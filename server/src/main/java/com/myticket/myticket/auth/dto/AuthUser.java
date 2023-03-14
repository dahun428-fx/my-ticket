package com.myticket.myticket.auth.dto;

import com.myticket.myticket.user.Enum.UserRoleType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@ToString
@Data
@AllArgsConstructor
public class AuthUser {
    private String accessToken;
}
