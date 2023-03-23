import React from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import useLogout from "../hooks/useLogout";
import { moon, signIn, signOut, signUp, sun } from "../img/iconPaths";
import Icon from "./Icon";

const CreateDropdown = () => {
    const { auth, darkMode, setDarkMode } = useAppContext();
    const navigate = useNavigate();
    const logout = useLogout();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <div
            id="createDropdown"
            className="absolute top-[44px] min-w-max rounded-b-lg border-dark-3 border-[2px] border-t-0 bg-light-1 dark:bg-dark-2 overflow-hidden  flex flex-col text-lg transition-all ease-in-out"
        >
            <button
                className="flex align-middle gap-2 hover:bg-light-2 p-5 dark:hover:bg-dark-3"
                onClick={() => navigate("/newpost")}
            >
                New Post
            </button>
            <button
                className="flex align-middle gap-2 hover:bg-light-2 p-5 dark:hover:bg-dark-3"
                onClick={() => navigate("/newchannel")}
            >
                New Channel
            </button>
        </div>
    );
};

export default CreateDropdown;
