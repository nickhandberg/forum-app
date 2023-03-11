import "boxicons";
import { useState } from "react";
import Nav from "./components/Nav";
import "./index.css";
import Home from "./pages/Home";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [showGrid, setShowGrid] = useState(true);

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
