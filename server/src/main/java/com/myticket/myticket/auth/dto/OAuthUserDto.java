package com.myticket.myticket.auth.dto;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class OAuthUserDto {
    
    private String googleId;
    private String id;
    private String name;
}
