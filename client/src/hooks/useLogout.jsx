import axios from "../utils/axios";
import useAppContext from "./useAppContext";

const useLogout = () => {
    const { setAuth } = useAppContext();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios("/auth/logout", {
                withCredentials: true,
            });
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
