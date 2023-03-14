import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import "./index.css";
import Channel from "./pages/Channel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import Registration from "./pages/Registration";

import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import useAppContext from "./hooks/useAppContext";
import CreatePost from "./pages/CreatePost";

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
                        {/* PUBLIC ROUTES */}
                        <Route path="" element={<Home />} />
                        <Route path="/c/:channel" element={<Channel />}></Route>
                        <Route path="/register" element={<Registration />} />
                        <Route path="/login" element={<Login />} />

                        {/* PROTECTED ROUTES */}
                        <Route element={<PersistLogin />}>
                            <Route element={<RequireAuth />}>
                                <Route
                                    path="/c/:channel/newpost"
                                    element={<CreatePost />}
                                />
                            </Route>
                        </Route>

                        {/* CATCH ALL ROUTE */}
                        <Route path="*" element={<Missing />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
