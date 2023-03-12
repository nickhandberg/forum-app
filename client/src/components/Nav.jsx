import React, { useState } from "react";
import { profileDropdownIcon, search } from "../img/iconPaths";
import Icon from "./Icon";
import ProfileDropdown from "./ProfileDropdown";

const Nav = ({
    profileMenuOpen,
    setProfileMenuOpen,
    darkMode,
    setDarkMode,
}) => {
    return (
        <header>
            <nav className="fixed w-full h-[50px] bg-light-1 dark:bg-dark-2 dark:text-light-1 flex p-2 pl-14 pr-[75px] rounded-bl-[50px] border-b-[2px] border-dark-3 justify-between items-center">
                <h1 className="text-2xl  font-bold">Forum</h1>
                <div className="flex-shrink  text-md font-medium hidden md:flex lg:flex space-x-[4vw] mx-8">
                    <a href="">home</a>
                    <a href="">popular</a>
                    <a href="">random</a>
                    <a href="">favorites</a>
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
                        className="cursor-pointer flex align-middle"
                        id="profileIcon"
                    >
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
