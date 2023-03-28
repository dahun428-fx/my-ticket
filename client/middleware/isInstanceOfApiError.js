export function isInstanceOfApiError(object) {
    return (
        object instanceof ApiError && ('redirectUrl' in object || 'notFound' in object)
    )
}

export class ApiError extends Error {
    redirectUrl = '';
    notFound = false;
}

export class NotFoundError extends ApiError {
    name = 'NotFoundError';
    message = '찾을 수 없습니다.';
    notFound = true;
}

export class ForbiddenError extends ApiError {
    name = 'ForbiddenError';
    message = '권한이 없습니다.';
    redirectUrl = '/error/error'
}

export class AuthError extends ApiError {
    name = 'AuthError';
    message = '인증되지 않은 사용자입니다.';
    redirectUrl = '/signin'
}

export class ExpiredRefreshTokenError extends ApiError {
    name = 'ExpiredRefreshTokenError';
    message = '다시 로그인 해주세요.';
    redirectUrl = '/signin'
}
export class DuplicateError extends ApiError {
    name = 'DuplicateError'
    message = '중복된 사용자입니다.';
    notFound = false;
}