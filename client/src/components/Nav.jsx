import React from "react";

const Nav = ({ darkMode, toggleDarkMode }) => {
    let color = "white";
    return (
        <header className={`${darkMode && "dark"}`}>
            <nav className=" w-full h-auto  bg-light-1 dark:bg-dark-2 dark:text-light-1 flex p-2 px-14 rounded-bl-[50px] border-b-[2px] border-dark-3 justify-between items-center">
                <h1 className="text-2xl  font-bold">Forum</h1>
                <div className="flex-shrink  text-md font-medium hidden md:flex lg:flex space-x-[4vw] mx-8">
                    <a href="">home</a>
                    <a href="">popular</a>
                    <a href="">random</a>
                    <a href="">favorites</a>
                </div>
                <div className="hidden md:flex lg:flex items-center gap-2 mr-8">
                    <input
                        className="w-full rounded-md placeholder-dark-2 bg-light-2 border-light-2 border-2 px-2 dark:bg-dark-3 dark:border-dark-3 dark:placeholder-light-3"
                        type="text"
                        placeholder="search"
                    />
                    <button
                        className="flex align-middle"
                        onClick={toggleDarkMode}
                    >
                        <box-icon
                            color={darkMode ? "#e6e8eb" : "#161617"}
                            name="search"
                            size="28px"
                        ></box-icon>
                    </button>
                </div>
                <div className="flex-shrink flex align-middle">
                    <box-icon
                        color={darkMode ? "#e6e8eb" : "#161617"}
                        type="solid"
                        name="user-circle"
                        size="md"
                    ></box-icon>
                </div>
            </nav>
        </header>
    );
};

export default Nav;
