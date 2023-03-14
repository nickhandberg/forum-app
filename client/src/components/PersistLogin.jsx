import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAppContext();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        if (!auth?.accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }

        return () => (isMounted = false);
    }, []);

    return <>{isLoading ? <p>Loading....</p> : <Outlet />}</>;
};

export default PersistLogin;
