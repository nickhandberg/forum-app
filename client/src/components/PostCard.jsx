import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import {
    altDownvote,
    altUpvote,
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
import { getDomain } from "../utils/getDomain";
import { getPostAge } from "../utils/getPostAge";
import Icon from "./Icon";

const PostCard = ({
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

    function redirect(e, path) {
        e.stopPropagation();
        navigate(path);
    }

    return (
        <div
            onClick={() => navigate(`/c/${channel}/${post_id.toString(32)}`)}
            className="bg-light-1 dark:bg-dark-2 break-inside-avoid cursor-pointer  mb-4 md:rounded-md flex-col flex justify-between"
        >
            {image && !link && (
                <img
                    className="max-h-[800px] w-full m-auto md:rounded-t-md"
                    src={image}
                ></img>
            )}

            {link && !image && (
                <div className="max-h-[480px]  cursor-pointer bg-light-3 dark:bg-dark-3 text-center overflow-hidden p-4 text-lg md:rounded-md h-full dark:text-light-2">
                    <Icon
                        path={linkExternal}
                        fill={darkMode ? "#c4c4c4" : "#161617"}
                        stroke={darkMode ? "#c4c4c4" : "#161617"}
                        w={"15vw"}
                        h={"15vw"}
                    />
                    <br />
                    {link}
                </div>
            )}
            {link && image && (
                <div>
                    <div className="max-h-[720px] cursor-pointer bg-light-3 dark:bg-dark-3 text-center overflow-hidden text-lg md:rounded-md h-full dark:text-light-2">
                        <img
                            className="w-min min-h-[200px] m-auto"
                            src={image}
                        ></img>
                    </div>
                    <div className="relative backdrop-brightness-50 backdrop-blur-sm p-4 bottom-0 h-[60px] mt-[-60px]">
                        <p className="text-xl text-light-1  md:text-3xl">
                            {getDomain(link)}
                        </p>
                    </div>
                </div>
            )}

            <div className="flex flex-col px-4 pt-4 z-10">
                <h1 className="text-lg md:text-2xl dark:text-light-1 font-semibold">
                    {title}
                </h1>
                <div className="flex flex-col md:flex-row md:gap-8 md:mt-1">
                    <p
                        className="text-green-1 text-sm md:text-base hover:underline w-min cursor-pointer"
                        onClick={(e) => redirect(e, `/c/${channel}`)}
                    >
                        {channel}
                    </p>
                    <p className="dark:text-light-2 text-xs md:text-base">
                        Posted by{" "}
                        <span
                            onClick={(e) => redirect(e, `/u/${username}`)}
                            className="text-green-1 hover:underline cursor-pointer"
                        >
                            {username}
                        </span>{" "}
                        {getPostAge(age)}
                    </p>
                </div>
            </div>

            {self_text && (
                <div>
                    <pre className="postText max-h-[250px] md:max-h-[300px] lg:max-h-[480px]  overflow-hidden px-4 pt-2 text-lg md:rounded-md h-full dark:text-light-2">
                        {self_text}
                    </pre>

                    <div
                        className={`${
                            self_text.length > 500
                                ? darkMode
                                    ? "grad1"
                                    : "grad2"
                                : ""
                        } w-full bottom-[0px] h-[100px] md:h-[100px] mt-[-100px] md:mt-[-100px] relative `}
                    ></div>
                    {/* <p className="text-dark-1  dark:text-light-1 text-lg relative bottom-[10px] md:bottom-[25px] text-center">
                        Read More
                    </p> */}
                </div>
            )}

            <div className="flex justify-between mt-4 pb-4  px-4">
                <div className="flex flex-col text-sm dark:text-light-2">
                    <p>
                        {karma > 1000 ? (karma / 1000).toFixed(1) + "k" : karma}{" "}
                        points
                    </p>
                    <p>152 comments</p>
                </div>

                <div className="flex items-center gap-8">
                    <button
                        onClick={(e) => {
                            handleUpvote(e);
                        }}
                    >
                        <Icon
                            //path={upvoted ? upvoteFilled : upvote}
                            path={altUpvote}
                            fill={
                                upvoted
                                    ? "#6fc938"
                                    : darkMode
                                    ? "#c4c4c4"
                                    : "#68696b"
                            }
                            stroke={
                                upvoted
                                    ? "#6fc938"
                                    : darkMode
                                    ? "#c4c4c4"
                                    : "#68696b"
                            }
                            w={"35px"}
                            h={"35px"}
                        />
                    </button>

                    <button
                        onClick={(e) => {
                            handleDownvote(e);
                        }}
                    >
                        <Icon
                            //path={downvoted ? downvoteFilled : downvote}
                            path={altDownvote}
                            fill={
                                downvoted
                                    ? "#d90f63"
                                    : darkMode
                                    ? "#c4c4c4"
                                    : "#68696b"
                            }
                            stroke={
                                downvoted
                                    ? "#d90f63"
                                    : darkMode
                                    ? "#c4c4c4"
                                    : "#68696b"
                            }
                            w={"35px"}
                            h={"35px"}
                        />
                    </button>
                    <button
                        className="flex align-middle"
                        onClick={(e) => handleSave(e)}
                    >
                        <Icon
                            path={saved ? starFilled : star}
                            fill={
                                saved
                                    ? "#d6c106"
                                    : darkMode
                                    ? "#c4c4c4"
                                    : "#68696b"
                            }
                            stroke={
                                saved
                                    ? "#d6c106"
                                    : darkMode
                                    ? "#c4c4c4"
                                    : "#68696b"
                            }
                            w={"30px"}
                            h={"30px"}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
