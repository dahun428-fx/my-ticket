import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PAGE_LOGIN } from "../api/url/enum/user.page.url";

export default function useAuth(shouldRedirect) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // const permitAll = ['/user/updateAuth', '/test/getuserTest']
    // const permitAll = [ '/test/getuserTest', '/signup']
    const permitAll = [ '/', '/signup', '/product/movie', '/product/movie/detail/[movieid]', '/product/search', '/product/movie/actor/[movietitle]']

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signOut({ callbackUrl: PAGE_LOGIN, redirect: shouldRedirect });
        }
        // console.log('check session , ', session);
        // console.log(router.route)
        if (permitAll.includes(router.route)) {

            setIsAuthenticated(true);
        
        } else if (session === null) {
            if (router.route !== PAGE_LOGIN) {
                router.replace(PAGE_LOGIN, undefined, {shallow:true});
                setIsAuthenticated(false);
            } else if (router.route === PAGE_LOGIN) {
                setIsAuthenticated(true);
            }
        } else if (session !== undefined) {
            if (router.route === PAGE_LOGIN) {
                router.replace('/', undefined, {shallow:true});
            }
            setIsAuthenticated(true);
        }
    }, [session, router]);

    return isAuthenticated;
}
