import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import "./index.css";
import Channel from "./pages/Channel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import Registration from "./pages/Registration";

import MissingChannel from "./components/MissingChannel";
import MissingUser from "./components/MissingUser";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import useAppContext from "./hooks/useAppContext";
import useRefreshToken from "./hooks/useRefreshToken";
import CommentDetails from "./pages/CommentDetails";
import CreateChannel from "./pages/CreateChannel";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import User from "./pages/User";

function App() {
    const { darkMode } = useAppContext();
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [createMenuOpen, setCreateMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const refresh = useRefreshToken();

    useEffect(() => {
        refresh();
    }, []);

    // Hide dropdown menu if user clicks on another part of screen
    document.addEventListener("click", function (event) {
        const dropdown = document.getElementById("profileDropdown");
        const dropdown2 = document.getElementById("createDropdown");
        const mobileMenu = document.getElementById("mobileMenu");
        const icon = document.getElementById("profileIcon");
        const icon2 = document.getElementById("createIcon");
        const mobileIcon = document.getElementById("mobileIcon");
        if (dropdown !== null) {
            if (
                !dropdown.contains(event.target) &&
                !icon.contains(event.target)
            ) {
                setProfileMenuOpen(false);
            }
        }
        if (dropdown2 !== null) {
            if (
                !dropdown2.contains(event.target) &&
                !icon2.contains(event.target)
            ) {
                setCreateMenuOpen(false);
            }
        }
        if (mobileMenu !== null) {
            if (
                !mobileMenu.contains(event.target) &&
                !mobileIcon.contains(event.target)
            ) {
                setMobileMenuOpen(false);
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
                        createMenuOpen={createMenuOpen}
                        setCreateMenuOpen={setCreateMenuOpen}
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}
                    />
                    <Routes>
                        {/* PUBLIC ROUTES */}
                        <Route path="" element={<Home />} />
                        <Route path="/c/:channel" element={<Channel />}></Route>
                        <Route path="/u/:username" element={<User />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/c/:channel/:post_id" element={<Post />} />
                        <Route
                            path="/comment/:comment_id"
                            element={<CommentDetails />}
                        />

                        {/* PROTECTED ROUTES */}
                        <Route element={<PersistLogin />}>
                            <Route element={<RequireAuth />}>
                                <Route
                                    path="/newpost/:channel?"
                                    element={<CreatePost />}
                                />
                                <Route
                                    path="/newchannel/:channel?"
                                    element={<CreateChannel />}
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
