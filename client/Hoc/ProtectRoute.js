import useAuth from "./useAuth";

export const ProtectRoute = ({children}) => {
    const isAuthenticated = useAuth(true);
    if(!isAuthenticated) {
        return null;
    }
    return children;
}