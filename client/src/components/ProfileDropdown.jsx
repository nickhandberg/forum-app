import React from "react";

const ProfileDropdown = ({ darkMode, setDarkMode }) => {
    return (
        <div
            id="profileDropdown"
            className="fixed top-12 right-2 rounded-b-lg border-dark-3 border-[2px] border-t-0 bg-light-1 dark:bg-dark-2 overflow-hidden  flex flex-col text-lg transition-all ease-in-out"
        >
            <button
                className="flex align-middle gap-2 hover:bg-light-2 p-5 dark:hover:bg-dark-3"
                onClick={() => setDarkMode(!darkMode)}
            >
                <box-icon
                    color={darkMode ? "#e6e8eb" : "#161617"}
                    name={darkMode ? "sun" : "moon"}
                    size="25px"
                />
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button className="flex align-middle gap-2 hover:bg-light-2 p-5 dark:hover:bg-dark-3">
                <box-icon
                    color={darkMode ? "#e6e8eb" : "#161617"}
                    name="user"
                    size="25px"
                ></box-icon>
                Sign In
            </button>
            <button className="flex align-middle gap-2 hover:bg-light-2 p-5 dark:hover:bg-dark-3">
                <box-icon
                    color={darkMode ? "#e6e8eb" : "#161617"}
                    name="user-plus"
                    size="25px"
                ></box-icon>
                Sign Up
            </button>
        </div>
    );
};

export default ProfileDropdown;
