import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { moon, signIn, signOut, signUp, sun } from "../img/iconPaths";
import Icon from "./Icon";

const ProfileDropdown = ({ darkMode, setDarkMode }) => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    function redirect(path) {
        navigate(path);
    }

    return (
        <div
            id="profileDropdown"
            className="fixed top-12 right-2 rounded-b-lg border-dark-3 border-[2px] border-t-0 bg-light-1 dark:bg-dark-2 overflow-hidden  flex flex-col text-lg transition-all ease-in-out"
        >
            <button
                className="flex align-middle gap-2 hover:bg-light-2 p-5 dark:hover:bg-dark-3"
                onClick={() => setDarkMode(!darkMode)}
            >
                <Icon
                    path={darkMode ? sun : moon}
                    fill={darkMode ? "#c4c4c4" : "#161617"}
                    stroke={darkMode ? "#c4c4c4" : "#161617"}
                    w={"25px"}
                    h={"25px"}
                />
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button
                onClick={
                    auth?.username
                        ? () => redirect(`/u/${auth.username}`)
                        : () => redirect("/login")
                }
                className="flex align-middle gap-2 hover:bg-light-2 p-5 dark:hover:bg-dark-3"
            >
                <Icon
                    path={signIn}
                    fill={darkMode ? "#c4c4c4" : "#161617"}
                    stroke={darkMode ? "#c4c4c4" : "#161617"}
                    w={"25px"}
                    h={"25px"}
                />
                {auth?.username ? "Profile" : "Sign In"}
            </button>
            <button
                onClick={
                    auth?.username
                        ? () => redirect("/logout")
                        : () => redirect("/register")
                }
                className="flex align-middle gap-2 hover:bg-light-2 p-5 dark:hover:bg-dark-3"
            >
                <Icon
                    path={auth?.username ? signOut : signUp}
                    fill={darkMode ? "#c4c4c4" : "#161617"}
                    stroke={darkMode ? "#c4c4c4" : "#161617"}
                    w={"25px"}
                    h={"25px"}
                />
                {auth?.username ? "Sign Out" : "Sign Up"}
            </button>
        </div>
    );
};

export default ProfileDropdown;
