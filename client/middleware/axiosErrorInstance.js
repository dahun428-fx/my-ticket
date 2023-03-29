import Cookies from "js-cookie";
import { AuthError, DuplicateError, ExpiredRefreshTokenError, ForbiddenError, NotFoundError } from "./isInstanceOfApiError";

export default function ErroInstance(error){

    if(error.response && error.response.status) {
        const status = error.response.status;
        const data = error.response.data;
        console.log('errror isntance , ', data.message);
        if(status == 401) {
            if(data && data.path === "/api/v1/auth/refresh") {
                throw new ExpiredRefreshTokenError();
            }
            throw new AuthError(data.message);
        }
        if(status == 403) {
            throw new ForbiddenError();
        }
        if(status == 404) {
            throw new NotFoundError();
        }
        //duplicate user
        if(status == 409) {
            throw new DuplicateError();
        }
    }
    return Promise.reject(error);
}