import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/auth/useRefreshToken";
import useAuth from "../hooks/auth/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const checkRefreshToken = async () => {
            try {
                await refresh();
            } catch(err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken && persist ? checkRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    return (
        <>
            { !persist
                ? <Outlet />
                : isLoading
                    ? <h2 className="container">Loading...</h2>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;