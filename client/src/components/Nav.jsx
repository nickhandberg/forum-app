import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import { menuIcon, plus, profileDropdownIcon, search } from "../img/iconPaths";
import axios from "../utils/axios";
import CreateDropdown from "./CreateDropdown";
import Icon from "./Icon";
import MobileMenu from "./MobileMenu";
import ProfileDropdown from "./ProfileDropdown";

const Nav = ({
    profileMenuOpen,
    setProfileMenuOpen,
    createMenuOpen,
    setCreateMenuOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
}) => {
    const { auth, darkMode } = useAppContext();
    const [channels, setChannels] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getChannels = async () => {
            try {
                const response = await axios.get(`/channels/`, {
                    signal: controller.signal,
                });
                isMounted && setChannels(response.data);
            } catch (err) {
                if (err.response?.status === 404) {
                    setMissing(true);
                } else {
                    console.error(err);
                }
            }
        };
        getChannels();

        return () => {
            isMounted = false;
            isMounted && controller.abort();
        };
    }, []);

    const navToRandomChannel = () => {
        let i = Math.floor(Math.random() * channels.length);
        redirect(`/c/${channels[i].channel_name}`);
    };

    function redirect(path) {
        navigate(path);
    }
    return (
        <header>
            <nav className="fixed w-full z-20 h-[50px] bg-light-1 dark:bg-dark-2 dark:text-light-1 flex p-2 md:pl-14 md:pr-[75px] md:rounded-bl-[50px] border-b-[2px] border-dark-3 justify-between items-center">
                <div className="md:hidden">
                    <button
                        id="mobileIcon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Icon
                            path={menuIcon}
                            fill={darkMode ? "#c4c4c4" : "#161617"}
                            stroke={darkMode ? "#c4c4c4" : "#161617"}
                            w={"28px"}
                            h={"28px"}
                        />
                    </button>

                    {mobileMenuOpen && (
                        <MobileMenu setMobileMenuOpen={setMobileMenuOpen} />
                    )}
                </div>

                <h1 className="text-2xl hidden md:block  font-bold">sawwit</h1>
                <div className="flex-shrink  text-md font-medium hidden md:flex lg:flex space-x-[4vw] mx-8">
                    <p className="cursor-pointer" onClick={() => redirect("/")}>
                        home
                    </p>
                    <p className="cursor-pointer" onClick={() => redirect("/")}>
                        all
                    </p>
                    <p
                        className="cursor-pointer"
                        onClick={() => navToRandomChannel()}
                    >
                        random
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
                <div className="relative gap-4 hidden md:flex">
                    <button
                        onClick={() => setCreateMenuOpen(!createMenuOpen)}
                        className="cursor-pointer flex align-middle items-center"
                        id="createIcon"
                    >
                        <Icon
                            path={plus}
                            fill={darkMode ? "#c4c4c4" : "#161617"}
                            stroke={darkMode ? "#c4c4c4" : "#161617"}
                            w={"35px"}
                            h={"35px"}
                        />
                    </button>
                    <button
                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                        className="cursor-pointer flex align-middle items-center"
                        id="profileIcon"
                    >
                        {auth?.accessToken ? (
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

                    {createMenuOpen && <CreateDropdown />}

                    {profileMenuOpen && <ProfileDropdown />}
                </div>
            </nav>
        </header>
    );
};

export default Nav;
