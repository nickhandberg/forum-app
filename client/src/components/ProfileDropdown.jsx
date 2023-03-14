import React from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import useLogout from "../hooks/useLogout";
import { moon, signIn, signOut, signUp, sun } from "../img/iconPaths";
import Icon from "./Icon";

const ProfileDropdown = () => {
    const { auth, darkMode, setDarkMode } = useAppContext();
    const navigate = useNavigate();
    const logout = useLogout();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

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
                    auth?.accessToken
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
                {auth?.accessToken ? "Profile" : "Sign In"}
            </button>
            <button
                onClick={
                    auth?.accessToken
                        ? () => handleLogout()
                        : () => redirect("/register")
                }
                className="flex align-middle gap-2 hover:bg-light-2 p-5 dark:hover:bg-dark-3"
            >
                <Icon
                    path={auth?.accessToken ? signOut : signUp}
                    fill={darkMode ? "#c4c4c4" : "#161617"}
                    stroke={darkMode ? "#c4c4c4" : "#161617"}
                    w={"25px"}
                    h={"25px"}
                />
                {auth?.accessToken ? "Sign Out" : "Sign Up"}
            </button>
        </div>
    );
};

export default ProfileDropdown;
