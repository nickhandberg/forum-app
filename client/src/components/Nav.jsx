import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { profileDropdownIcon, search } from "../img/iconPaths";
import Icon from "./Icon";
import ProfileDropdown from "./ProfileDropdown";

const Nav = ({
    profileMenuOpen,
    setProfileMenuOpen,
    darkMode,
    setDarkMode,
    randomChannelName,
}) => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    function redirect(path) {
        navigate(path);
    }
    return (
        <header>
            <nav className="fixed w-full h-[50px] bg-light-1 dark:bg-dark-2 dark:text-light-1 flex p-2 pl-14 pr-[75px] rounded-bl-[50px] border-b-[2px] border-dark-3 justify-between items-center">
                <h1 className="text-2xl  font-bold">Forum</h1>
                <div className="flex-shrink  text-md font-medium hidden md:flex lg:flex space-x-[4vw] mx-8">
                    <p className="cursor-pointer" onClick={() => redirect("/")}>
                        home
                    </p>
                    <p
                        className="cursor-pointer"
                        onClick={() => redirect("/c/battlestations/newpost")}
                    >
                        post
                    </p>
                    <p
                        className="cursor-pointer"
                        onClick={() => redirect(`/c/${randomChannelName}`)}
                    >
                        random
                    </p>
                    <p
                        className="cursor-pointer"
                        onClick={() => redirect("/c/all")}
                    >
                        all
                    </p>
                </div>
                <div className="hidden md:flex lg:flex items-center gap-2 mr-8">
                    <input
                        className="w-full rounded-md placeholder-dark-2 bg-light-3 border-light-3 border-2 px-2 dark:bg-dark-3 dark:border-dark-3 dark:placeholder-light-3"
                        type="text"
                        placeholder="search"
                    />
                    <button className="flex align-middle">
                        <Icon
                            path={search}
                            fill={darkMode ? "#c4c4c4" : "#161617"}
                            stroke={darkMode ? "#c4c4c4" : "#161617"}
                            w={"28px"}
                            h={"28px"}
                        />
                    </button>
                </div>
                <div className="flex-shrink  ">
                    <button
                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                        className="cursor-pointer flex align-middle items-center"
                        id="profileIcon"
                    >
                        {auth?.username ? (
                            <p className="mx-2">{auth.username}</p>
                        ) : (
                            ""
                        )}
                        <Icon
                            path={profileDropdownIcon}
                            fill={darkMode ? "#c4c4c4" : "#161617"}
                            stroke={darkMode ? "#c4c4c4" : "#161617"}
                            w={"40px"}
                            h={"40px"}
                        />
                    </button>

                    {profileMenuOpen && (
                        <ProfileDropdown
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                        />
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Nav;
