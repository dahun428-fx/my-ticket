package com.myticket.myticket.auth.Enum;

import java.util.Arrays;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ProviderType {
    GOOGLE(1, "GOOGLE"),
    GITHUB(2, "GITHUB"),
    FACEBOOK(3, "FACEBOOK"),
    NAVER(4, "NAVER"),
    KAKAO(5, "KAKAO"),
    LOCAL(0, "LOCAL");

    private final int type;
    private final String name;

    public static ProviderType ofProviderType(int type) {
        return Arrays.stream(ProviderType.values())
                     .filter(v -> v.getType() == type)
                     .findAny().orElseThrow();
    }
}
