import Cookies from "js-cookie";
import { AuthError, BadRequestError, DuplicateError, ExpiredRefreshTokenError, ForbiddenError, NotFoundError } from "./isInstanceOfApiError";
import { useRouter } from "next/router";

export default function ErroInstance(error){

    // console.log('ErroInstance' ,error);
    if(error.response && error.response.status) {
        const status = error.response.status;
        const data = error.response.data;
        if(status === 400) {
            throw new BadRequestError(data);
        }
        if(status == 401) {
            if(data && data.path === "/api/v1/auth/refresh") {
                throw new ExpiredRefreshTokenError();
            }
            throw new AuthError(data);
        }
        if(status == 403) {
            throw new ForbiddenError(data);
        }
        if(status == 404) {
            // window.location.href = '/error/404.js'
            throw new NotFoundError(data);
        }
        //duplicate user
        if(status == 409) {
            throw new DuplicateError(data);
        }
        if(status == 500) {
            throw new Error(data);
            // return new Promise(()=>{});
        }
        return Promise.reject(error);
    }
    return Promise.reject(error);
}