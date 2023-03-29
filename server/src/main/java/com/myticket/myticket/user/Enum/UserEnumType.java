package com.myticket.myticket.user.Enum;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum UserEnumType {
    /*
     * code / status / message
     */
    SIGN_UP_SUCCESS("success", "회원가입이 완료되었습니다."),
    SIGN_UP_FAIL("fail", "회원가입에 실패하였습니다."),
    SIGN_UP_ALREADY_EXIST_USER("fail", "다른 아이디를 입력해주세요."),

    LOGIN_SUCCESS("success", "로그인이 완료되었습니다."),
    LOGIN_FAIL("fail", "로그인에 실패하였습니다."),
    LOGIN_FAIL_SNS("fail", "SNS 로그인을 이용해주세요."),

    USER_NOT_FOUND("fail", "해당 회원을 찾을 수 없습니다."),
    USER_RE_LOGIN("fail", "다시 로그인을 시도 해주십시오.");

    private final String status;
    private final String message;

}
