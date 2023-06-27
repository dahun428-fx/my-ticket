export function isInstanceOfApiError(object) {
    return (
        object instanceof ApiError && ('message' in object)
    )
}

export class ApiError extends Error {
    constructor(data){
        super();
        this.message = data?.message;
        this.title = "API ERROR";
    }
}

export class BadRequestError extends ApiError {
    constructor(data) {
        super(data);
        this.status = 400;
        this.title = "BadRequestError";
    }
}

export class NotFoundError extends ApiError {
    constructor(data) {
        super(data);
        this.title = "NotFoundError";
    }
}

export class ForbiddenError extends ApiError {
    constructor() {
        super(data);
        this.title = "ForbiddenError";
    }
}

export class AuthError extends ApiError {
    constructor(data) {
        super(data);
        this.title = "AuthError";
    }
    
}


export class ExpiredRefreshTokenError extends ApiError {
    constructor(data) {
        super(data);
        this.title = "ExpiredRefreshTokenError";
    }
}
export class DuplicateError extends ApiError {
    constructor(data) {
        super(data);
        this.status = 409;
        this.title = "DuplicateError";
    }
}