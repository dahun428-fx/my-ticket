import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useAuth(shouldRedirect) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signOut({ callbackUrl: '/signin', redirect: shouldRedirect });
        }
        if (session === null) {
            if (router.route !== '/signin') {
                router.replace('/signin');
                setIsAuthenticated(false);
            } else if (router.route === '/signin') {
                setIsAuthenticated(true);
            }
        } else if (session !== undefined) {
            if (router.route === '/signin') {
                router.replace('/');
            } else {
                console.log('session data ', session);
            }
            setIsAuthenticated(true);
        }
    }, [session]);

    return isAuthenticated;
}
