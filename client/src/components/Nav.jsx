import React from "react";

const Nav = () => {
    return (
        <header>
            <nav className=" w-full h-auto  bg-light-1 dark:bg-dark-2 dark:text-dark-text-1 flex p-2 px-14 rounded-bl-[50px] border-b-[2px] border-dark-3 justify-between items-center">
                <h1 className="text-2xl  font-bold">Forum</h1>
                <div className="flex-shrink  text-md font-medium hidden md:flex lg:flex space-x-28">
                    <a>frontpage</a>
                    <a>popular</a>
                    <a>new</a>
                </div>
                <div className="flex-shrink">
                    <box-icon
                        color="#6fc938"
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
