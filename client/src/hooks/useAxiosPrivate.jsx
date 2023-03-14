import { useEffect } from "react";
import { axiosPrivate } from "../utils/axios";
import useAppContext from "./useAppContext";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAppContext();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                // if authorization header does not exist, not a retry
                if (!config.headers["Authorization"]) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            // return response if response is good
            (response) => response,
            // hanndle bad response (expired token)
            async (error) => {
                console.log("responseIntercept");
                const prevRequest = error?.config;
                // Checks if response is forbidden (expired token)
                // and if we havent previously sent the request (prevents infinite loop)
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        // clean up function to remove interceptors when finished
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
