package com.myticket.myticket.jwt.Enum;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum JwtEnum {
    EXPIRED("EXPIRE", "토큰이 만료되었습니다."),
    DENIED("DENIED", "유효하지 않은 토큰입니다."),
    ACCESS("ACCESS", "유효한 토큰입니다.");

    private final String status;
    private final String mesage;
}
