export function isInstanceOfApiError(object) {
    return (
        object instanceof ApiError && ('message' in object)
    )
}

export class ApiError extends Error {
    constructor(message){
        // console.log('apierror', message)
        super(message);
        this.message = message;
    }
    // redirectUrl = '';
    // notFound = false;
}

export class NotFoundError extends ApiError {
    constructor(message) {
        super(message);
        this.message = message;
    }
    // name = 'NotFoundError';
    // message = '찾을 수 없습니다.';
    // notFound = true;
}

export class ForbiddenError extends ApiError {
    constructor(message) {
        super(message);
        this.message = message;
    }
    // name = 'ForbiddenError';
    // message = '권한이 없습니다.';
    // redirectUrl = '/error/error'
}

export class AuthError extends ApiError {
    constructor(message) {
        super(message);
        this.message = message;
    }
    // name = 'AuthError';
    // message = '인증되지 않은 사용자입니다.';
    // redirectUrl = '/signin'
}

export class ExpiredRefreshTokenError extends ApiError {
    constructor(message) {
        super(message);
        this.message = message;
    }
    // name = 'ExpiredRefreshTokenError';
    // message = '다시 로그인 해주세요.';
    // redirectUrl = '/signin'
}
export class DuplicateError extends ApiError {
    constructor(message) {
        super(message);
        this.message = message;
        console.log('dupplication reeerr ', message)
    }
    // name = 'DuplicateError'
    // message = '중복된 사용자입니다.';
    // notFound = false;
}