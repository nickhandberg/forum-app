import "boxicons";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import "./index.css";
import Home from "./pages/Home";
import {
    getUserPrefs,
    setDarkModePref,
    setShowGridPref,
} from "./utils/userPrefs";

function App() {
    const [darkMode, setDarkMode] = useState(getUserPrefs().darkMode);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [showGrid, setShowGrid] = useState(getUserPrefs().showGrid);

    useEffect(() => {
        setDarkModePref(darkMode);

        setShowGridPref(showGrid);
    }, [darkMode, showGrid]);

    return (
        <div className={`${darkMode && "dark"} `}>
            <div className="bg-light-2 dark:bg-dark-1">
                <Nav
                    profileMenuOpen={profileMenuOpen}
                    setProfileMenuOpen={setProfileMenuOpen}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />
                <Home
                    showGrid={showGrid}
                    setShowGrid={setShowGrid}
                    darkMode={darkMode}
                />
            </div>
        </div>
    );
}

export default App;
