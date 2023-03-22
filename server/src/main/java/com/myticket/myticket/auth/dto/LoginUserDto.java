package com.myticket.myticket.auth.dto;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class LoginUserDto {
    private String id;
    private String password;
}
