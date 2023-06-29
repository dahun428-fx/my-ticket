export const USER_ID_ENUM = {
    MAX_LENGTH : '5~20자의 영문 소문자 및 숫자만 사용 가능합니다.',
    MIN_LENGTH : '5~20자의 영문 소문자 및 숫자만 사용 가능합니다.',
    REQUIRE : '아이디를 입력해주세요.',
    MATCHES : '5~20자의 영문 소문자 및 숫자만 사용 가능합니다.',
    DUPLICATE : '중복된 아이디입니다. 다른 아이디를 입력해주세요.',
    CHECK_DUPLICATE : '아이디 중복 확인을 해주세요.',
    GOOD : '사용가능한 아이디입니다.',
}
export const USER_NAME_ENUM = {
    REQUIRE : '성함을 입력해주세요.'
}

export const GENDER_ENUM = {
    REQUIRE : '성별을 입력해주세요.',
    MAX_LENGTH : '',
    MIN_LENGTH : '',
}
export const NICKNAME_ENUM = {
    MIN_LENGTH : '3~20자의 한글, 영문 소문자 및 숫자만 사용 가능합니다.',
    MAX_LENGTH : '3~20자의 한글, 영문 소문자 및 숫자만 사용 가능합니다.',
    REQUIRE : '닉네임을 입력해주세요.',
    MATCHES : '3~20자의 한글, 영문 소문자 및 숫자만 사용 가능합니다.',
}
export const PASSWORD_ENUM = {
    REQUIRE : '비밀번호를 입력해주세요.',
    EQUALS : '비밀번호는 동일해야합니다.',
    MAX_LENGTH : '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
    MIN_LENGTH : '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
    MATCHES : '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
}
export const EMAIL_ENUM = {
    MAX_LENGTH : '',
    MIN_LENGTH : '',
    REQUIRE : '이메일을 입력해주세요.',
    MATCHES : '이메일 형식에 맞지 않습니다.',
    CHECK_DUPLICATE : '중복된 이메일이 있습니다. 다른 이메일을 입력해주세요.',
}
export const BIRTHDAY_ENUM = {
    MAX_LENGTH : '',
    MIN_LENGTH : '',
    REQUIRE : '생년월일을 입력해주세요.',
    MATCHES : '',
}
export const TEL_ENUM = {
    MAX_LENGTH : '9~15자 숫자만 입력해주세요.',
    MIN_LENGTH : '9~15자 숫자만 입력해주세요.',
    REQUIRE : '전화번호를 입력해주세요.',
    MATCHES : '',
    NOT_NUMBER : '하이픈(-) 없이 숫자만 입력해주세요.',
}
export const POSTAL_ENUM = {
    MAX_LENGTH : '',
    MIN_LENGTH : '',
    REQUIRE : '우편번호를 입력해주세요.',
    NOT_NUMBER : '숫자만 입력해주세요',
    MATCHES : '',
}
export const ROAD_ADDR_ENUM = {
    MAX_LENGTH : '',
    MIN_LENGTH : '',
    REQUIRE : '도로명 주소를 입력해주세요.',
    MATCHES : '',
}
export const JIBUN_ADDR_ENUM = {
    MAX_LENGTH : '',
    MIN_LENGTH : '',
    REQUIRE : '지번 주소를 입력해주세요.',
    MATCHES : '',
}
export const ADDR_ENUM = {
    MAX_LENGTH : '',
    MIN_LENGTH : '',
    REQUIRE : '상세 주소를 입력해주세요.',
    MATCHES : '주소 형식이 맞지 않습니다.',
}
export const DEPARTMENT_ENUM = {
    REQUIRE : '부서를 입력해주세요.'
}