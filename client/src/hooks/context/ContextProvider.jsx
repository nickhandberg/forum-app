import { createContext, useEffect, useState } from "react";
import {
    getUserPrefs,
    setDarkModePref,
    setShowGridPref,
} from "../../utils/userPrefs";

const AppContext = createContext({});

export const ContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [darkMode, setDarkMode] = useState(getUserPrefs().darkMode);
    const [showGrid, setShowGrid] = useState(getUserPrefs().showGrid);

    useEffect(() => {
        // Update user preferences
        setDarkModePref(darkMode);
        setShowGridPref(showGrid);
    }, [darkMode, showGrid]);

    return (
        <AppContext.Provider
            value={{
                auth,
                setAuth,
                darkMode,
                setDarkMode,
                showGrid,
                setShowGrid,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
