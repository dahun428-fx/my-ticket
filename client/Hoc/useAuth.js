import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PAGE_LOGIN } from "../api/url/enum/user.page.url";

export default function useAuth(shouldRedirect) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signOut({ callbackUrl: PAGE_LOGIN, redirect: shouldRedirect });
        }
        if (session === null) {
            if (router.route !== PAGE_LOGIN) {
                router.replace(PAGE_LOGIN);
                setIsAuthenticated(false);
            } else if (router.route === PAGE_LOGIN) {
                setIsAuthenticated(true);
            }
        } else if (session !== undefined) {
            if (router.route === PAGE_LOGIN) {
                router.replace('/');
            }
            setIsAuthenticated(true);
        }
    }, [session]);

    return isAuthenticated;
}
