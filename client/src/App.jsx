import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import "./index.css";
import Channel from "./pages/Channel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import {
    getUserPrefs,
    setDarkModePref,
    setShowGridPref,
} from "./utils/userPrefs";

import RequireAuth from "./components/RequireAuth";
import useAppContext from "./hooks/useAppContext";
import CreatePost from "./pages/CreatePost";
import Logout from "./pages/Logout";

function App() {
    const { darkMode } = useAppContext();
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

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
                    />
                    <Routes>
                        <Route path="" element={<Home />} />

                        <Route path="/c/:channel" element={<Channel />}></Route>
                        <Route element={<RequireAuth />}>
                            {/* Routes that need sign in go here */}
                            <Route
                                path="/c/:channel/newpost"
                                element={<CreatePost />}
                            />
                        </Route>

                        <Route path="/register" element={<Registration />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
