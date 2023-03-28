package com.myticket.myticket.user.Enum;

import java.util.Arrays;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum UserRoleType {
    ROLE_USER(1, "ROLE_USER"),
    ROLE_ADMIN(0, "ROLE_ADMIN"),
    ROLE_OAUTH2(2, "ROLE_OAUTH2");

    private final int type;
    private final String name;

    public static UserRoleType ofRoleType(int type){
        return Arrays.stream(UserRoleType.values())
                     .filter(v -> v.getType() == type)
                     .findAny().orElseThrow();
    }
}
