import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import useAppContext from "../hooks/useAppContext";
import {
    comment,
    downvote,
    downvoteFilled,
    linkExternal,
    star,
    starFilled,
    upvote,
    upvoteFilled,
} from "../img/iconPaths";
import axios from "../utils/axios";
import { getPostAge } from "../utils/getPostAge";

const PostContent = ({
    post_id,
    channel,
    username,
    image,
    link,
    self_text,
    title,
    age,
    karma,
}) => {
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [saved, setSaved] = useState(false);
    const [linkData, setLinkData] = useState({});
    const { darkMode } = useAppContext();

    const navigate = useNavigate();

    const handleUpvote = (e) => {
        e.stopPropagation();
        setUpvoted(!upvoted);
        setDownvoted(false);
    };
    const handleDownvote = (e) => {
        e.stopPropagation();
        setDownvoted(!downvoted);
        setUpvoted(false);
    };

    const handleSave = (e) => {
        e.stopPropagation();
        setSaved(!saved);
    };

    return (
        <div className="bg-light-1 dark:bg-dark-2 p-4 md:rounded-md w-full md:max-w-[1000px] flex-col flex justify-between">
            <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl dark:text-light-1 font-semibold mb-2">
                    {title}
                </h1>
                <div className="flex flex-col md:flex-row md:gap-8 mb-2">
                    <p
                        className="text-green-1 hover:underline  dark:text-green-1 cursor-pointer"
                        onClick={() => navigate(`/c/${channel}`)}
                    >
                        {channel}
                    </p>
                    <p className="dark:text-light-2 text-sm md:text-base">
                        Posted by{" "}
                        <span
                            onClick={() => navigate(`/u/${username}`)}
                            className="text-green-1 hover:underline cursor-pointer"
                        >
                            {username}
                        </span>{" "}
                        {getPostAge(age)}
                    </p>
                </div>
            </div>

            {image && (
                <img className=" max-h-[720px] w-min m-auto" src={image}></img>
            )}

            {self_text && (
                <p className=" bg-light-3 dark:bg-dark-3 overflow-hidden p-4 text-lg rounded-md h-full dark:text-light-2">
                    {self_text}
                </p>
            )}

            {link && (
                <a
                    href={link}
                    className="max-h-[480px]   cursor-pointer bg-light-3 dark:bg-dark-3 text-center overflow-hidden p-4 text-lg rounded-md h-full dark:text-light-2"
                >
                    <Icon
                        path={linkExternal}
                        fill={darkMode ? "#c4c4c4" : "#161617"}
                        stroke={darkMode ? "#c4c4c4" : "#161617"}
                        w={"15vw"}
                        h={"15vw"}
                    />
                    <br />
                    {link}
                </a>
            )}
            <div className="flex justify-between mt-4 md:px-6 max-w-[400px]">
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            handleUpvote(e);
                        }}
                    >
                        <Icon
                            path={upvoted ? upvoteFilled : upvote}
                            fill={
                                upvoted
                                    ? "#6fc938"
                                    : darkMode
                                    ? "#c4c4c4"
                                    : "#161617"
                            }
                            stroke={darkMode ? "#c4c4c4" : "#161617"}
                            w={"30px"}
                            h={"30px"}
                        />
                    </button>
                    <p className="dark:text-light-2 text-lg text-center">
                        {karma > 1000 ? (karma / 1000).toFixed(1) + "k" : karma}
                    </p>
                    <button
                        onClick={(e) => {
                            handleDownvote(e);
                        }}
                    >
                        <Icon
                            path={downvoted ? downvoteFilled : downvote}
                            fill={
                                downvoted
                                    ? "#d90f63"
                                    : darkMode
                                    ? "#c4c4c4"
                                    : "#161617"
                            }
                            stroke={darkMode ? "#c4c4c4" : "#161617"}
                            w={"30px"}
                            h={"30px"}
                        />
                    </button>
                </div>

                <button
                    className="flex align-middle"
                    onClick={(e) => handleSave(e)}
                >
                    <Icon
                        path={saved ? starFilled : star}
                        fill={
                            saved ? "#d6c106" : darkMode ? "#c4c4c4" : "#161617"
                        }
                        stroke={darkMode ? "#c4c4c4" : "#161617"}
                        w={"30px"}
                        h={"30px"}
                    />
                </button>
            </div>
        </div>
    );
};

export default PostContent;
