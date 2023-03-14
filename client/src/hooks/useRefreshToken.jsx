import axios from "../utils/axios";
import useAppContext from "./useAppContext";

const useRefreshToken = () => {
    const { setAuth } = useAppContext();

    const refresh = async () => {
        const response = await axios.get("/auth/refresh", {
            withCredentials: true,
        });
        setAuth((prev) => {
            return { ...prev, accessToken: response.data.accessToken };
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
