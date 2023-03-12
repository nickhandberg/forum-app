import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
        // Update user preferences
        setDarkModePref(darkMode);
        setShowGridPref(showGrid);
    }, [darkMode, showGrid]);

    // Hide dropdown menu if user clicks on another part of screen
    document.addEventListener("click", function (event) {
        const dropdown = document.getElementById("profileDropdown");
        const icon = document.getElementById("profileIcon");
        if (dropdown !== null) {
            if (
                !dropdown.contains(event.target) &&
                !icon.contains(event.target)
            ) {
                setProfileMenuOpen(false);
            }
        }
    });

    return (
        <Router>
            <div className={`${darkMode && "dark"} `}>
                <div className="bg-light-2 dark:bg-dark-1 min-h-screen">
                    <Nav
                        profileMenuOpen={profileMenuOpen}
                        setProfileMenuOpen={setProfileMenuOpen}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    showGrid={showGrid}
                                    setShowGrid={setShowGrid}
                                    darkMode={darkMode}
                                />
                            }
                        />
                        <Route
                            path="/c/:channel"
                            element={
                                <Home
                                    showGrid={showGrid}
                                    setShowGrid={setShowGrid}
                                    darkMode={darkMode}
                                />
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
