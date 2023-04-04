import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import useLogout from "../hooks/useLogout";
import {
    allIcon,
    chevDown,
    chevLeft,
    chevUp,
    homeIcon,
    moon,
    newPostIcon,
    plus,
    randomIcon,
    signIn,
    signOut,
    signUp,
    sun,
} from "../img/iconPaths";
import Icon from "./Icon";

const MobileMenu = ({ setMobileMenuOpen, navToRandomChannel }) => {
    const [accountOpen, setAccountOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const { auth, darkMode, setDarkMode } = useAppContext();
    const navigate = useNavigate();
    const logout = useLogout();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <div
            id="mobileMenu"
            className="fixed top-0 left-[-2px] h-[101vh] min-w-[250px] border-dark-3 border-[2px] border-t-0 bg-light-1 dark:bg-dark-2 overflow-hidden  flex flex-col text-lg transition-all ease-in-out"
        >
            <button
                className="flex justify-between items-center  hover:bg-light-2 py-5 pl-5 pr-2 dark:hover:bg-dark-3"
                onClick={() => setMobileMenuOpen(false)}
            >
                <h1>sawwit</h1>
                <Icon
                    path={chevLeft}
                    fill={darkMode ? "#c4c4c4" : "#161617"}
                    stroke={darkMode ? "#c4c4c4" : "#161617"}
                    w={"35px"}
                    h={"35px"}
                />
            </button>

            <button
                className="flex align-middle gap-2 hover:bg-light-2 p-5 dark:hover:bg-dark-3"
                onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/");
                }}
            >
                <Icon
                    path={homeIcon}
                    fill={darkMode ? "#c4c4c4" : "#161617"}
                    stroke={darkMode ? "#c4c4c4" : "#161617"}
                    w={"25px"}
                    h={"25px"}
                />
                Home
            </button>

            <button
                className="flex align-middle gap-2 hover:bg-light-2 p-5 dark:hover:bg-dark-3"
                onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/all");
                }}
            >
                <Icon
                    path={allIcon}
                    fill={darkMode ? "#c4c4c4" : "#161617"}
                    stroke={darkMode ? "#c4c4c4" : "#161617"}
                    w={"25px"}
                    h={"25px"}
                />
                All
            </button>

            <button
                className="flex align-middle gap-2 hover:bg-light-2 p-5 dark:hover:bg-dark-3"
                onClick={() => {
                    setMobileMenuOpen(false);
                    navToRandomChannel();
                }}
            >
                <Icon
                    path={randomIcon}
                    fill={darkMode ? "#c4c4c4" : "#161617"}
                    stroke={darkMode ? "#c4c4c4" : "#161617"}
                    w={"25px"}
                    h={"25px"}
                />
                Random
            </button>

            <button
                className="flex justify-between hover:bg-light-2 p-5 dark:hover:bg-dark-3"
                onClick={() => setAccountOpen(!accountOpen)}
            >
                <div className="flex align-middle gap-2">
                    <Icon
                        path={signIn}
                        fill={darkMode ? "#c4c4c4" : "#161617"}
                        stroke={darkMode ? "#c4c4c4" : "#161617"}
                        w={"25px"}
                        h={"25px"}
                    />
                    <p>Account</p>
                </div>
                <Icon
                    path={accountOpen ? chevUp : chevDown}
                    fill={darkMode ? "#c4c4c4" : "#161617"}
                    stroke={darkMode ? "#c4c4c4" : "#161617"}
                    w={"25px"}
                    h={"25px"}
                />
            </button>

            {accountOpen && (
                <div className="flex flex-col align-middle pl-12">
                    <button
                        onClick={
                            auth?.accessToken
                                ? () => {
                                      setMobileMenuOpen(false);
                                      navigate(`/u/${auth.username}`);
                                  }
                                : () => {
                                      setMobileMenuOpen(false);
                                      navigate("/login");
                                  }
                        }
                        className="flex align-middle gap-2 hover:bg-light-2 py-4  dark:hover:bg-dark-3"
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
                                ? () => {
                                      setMobileMenuOpen(false);
                                      handleLogout();
                                  }
                                : () => {
                                      setMobileMenuOpen(false);
                                      navigate("/register");
                                  }
                        }
                        className="flex align-middle gap-2 hover:bg-light-2 py-4 dark:hover:bg-dark-3"
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
            )}

            <button
                className="flex justify-between hover:bg-light-2 p-5 dark:hover:bg-dark-3"
                onClick={() => setCreateOpen(!createOpen)}
            >
                <div className="flex align-middle gap-2">
                    <Icon
                        path={plus}
                        fill={darkMode ? "#c4c4c4" : "#161617"}
                        stroke={darkMode ? "#c4c4c4" : "#161617"}
                        w={"25px"}
                        h={"25px"}
                    />
                    <p>Create</p>
                </div>
                <Icon
                    path={createOpen ? chevUp : chevDown}
                    fill={darkMode ? "#c4c4c4" : "#161617"}
                    stroke={darkMode ? "#c4c4c4" : "#161617"}
                    w={"25px"}
                    h={"25px"}
                />
            </button>

            {createOpen && (
                <div className="flex flex-col align-middle pl-12">
                    <button
                        className="flex align-middle gap-2 hover:bg-light-2 py-4 dark:hover:bg-dark-3"
                        onClick={() => {
                            setMobileMenuOpen(false);
                            navigate("/newpost");
                        }}
                    >
                        <Icon
                            path={newPostIcon}
                            fill={darkMode ? "#c4c4c4" : "#161617"}
                            stroke={darkMode ? "#c4c4c4" : "#161617"}
                            w={"25px"}
                            h={"25px"}
                        />
                        New Post
                    </button>
                    <button
                        className="flex align-middle gap-2 hover:bg-light-2 py-4 dark:hover:bg-dark-3"
                        onClick={() => {
                            setMobileMenuOpen(false);
                            navigate("/newchannel");
                        }}
                    >
                        <Icon
                            path={newPostIcon}
                            fill={darkMode ? "#c4c4c4" : "#161617"}
                            stroke={darkMode ? "#c4c4c4" : "#161617"}
                            w={"25px"}
                            h={"25px"}
                        />
                        New Channel
                    </button>
                </div>
            )}

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
        </div>
    );
};

export default MobileMenu;
