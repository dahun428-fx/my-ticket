package com.myticket.myticket.user.dto;

import lombok.Data;

@Data
public class CreateUserDto {
    private int no;
    private String id;
    private String name;
    private String password;
}
