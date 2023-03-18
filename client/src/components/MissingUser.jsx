import React from "react";
import { useParams } from "react-router-dom";
import { missingUserIcon } from "../img/iconPaths";
import Icon from "./Icon";

const MissingUser = ({ darkMode }) => {
    return (
        <div className="flex pt-[100px] justify-center items-center">
            <div className="bg-light-1 dark:bg-dark-2 flex flex-col gap-4 w-full max-w-[500px] p-4 text-center text-dark-1 md:rounded-lg dark:text-light-1 mb-12">
                <Icon
                    path={missingUserIcon}
                    fill={darkMode ? "#c4c4c4" : "#363738"}
                    stroke={darkMode ? "#c4c4c4" : "#363738"}
                    w={"100px"}
                    h={"100px"}
                />
                <h1 className="text-4xl">User not found</h1>
                <p className="text-lg">
                    Sorry, a user was not found with that username
                </p>
            </div>
        </div>
    );
};

export default MissingUser;
