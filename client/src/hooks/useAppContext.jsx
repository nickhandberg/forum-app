import { useContext, useDebugValue } from "react";
import AppContext from "./context/ContextProvider";

const useAppContext = () => {
    const { auth } = useContext(AppContext);
    useDebugValue(auth, (auth) =>
        auth?.username ? "Logged In" : "Logged Out"
    );
    return useContext(AppContext);
};

export default useAppContext;
