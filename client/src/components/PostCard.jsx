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
import ButtonBar from "./ButtonBar";
import Icon from "./Icon";
import TitleBar from "./TitleBar";

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

            <TitleBar
                title={title}
                channel={channel}
                username={username}
                age={age}
            />

            {self_text && (
                <div>
                    <pre className="postText max-h-[250px] md:max-h-[300px] lg:max-h-[480px]  overflow-hidden px-4 pt-2 text-sm md:text-base md:rounded-md h-full dark:text-light-2">
                        {self_text}
                    </pre>

                    {/* <div
                        className={`${
                            self_text.length > 500
                                ? darkMode
                                    ? "grad1"
                                    : "grad2"
                                : ""
                        } w-full bottom-[0px] h-[100px] md:h-[100px] mt-[-100px] md:mt-[-100px] relative `}
                    ></div> */}
                </div>
            )}

            <ButtonBar
                isCard={true}
                karma={karma}
                username={username}
                channel={channel}
                self_text={self_text ? true : false}
            />
        </div>
    );
};

export default PostCard;
