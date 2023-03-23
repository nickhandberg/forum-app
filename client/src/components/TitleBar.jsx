import React from "react";
import { useNavigate } from "react-router-dom";
import { getPostAge } from "../utils/getPostAge";

const TitleBar = ({ title, channel, username, age }) => {
    const navigate = useNavigate();

    const redirect = (e, path) => {
        e.stopPropagation();
        navigate(path);
    };

    return (
        <div className="flex flex-col px-4 pt-4">
            <h1 className="text-lg md:text-2xl dark:text-light-1 font-semibold">
                {title}
            </h1>
            <div className="flex flex-wrap gap-1 md:mt-1 dark:text-light-2 text-xs md:text-base">
                <p
                    className="text-green-1 hover:underline w-min cursor-pointer"
                    onClick={(e) => redirect(e, `/c/${channel}`)}
                >
                    {channel}
                </p>
                <p>•</p>
                <p
                    className="cursor-pointer hover:underline"
                    onClick={(e) => redirect(e, `/u/${username}`)}
                >
                    {username}
                </p>
                <p>•</p>
                <p>{getPostAge(age)}</p>
            </div>
        </div>
    );
};

export default TitleBar;
