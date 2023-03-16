import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import useAppContext from "../hooks/useAppContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
    comment,
    downvote,
    downvoteFilled,
    editIcon,
    linkExternal,
    star,
    starFilled,
    trashcan,
    upvote,
    upvoteFilled,
} from "../img/iconPaths";
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
    const [confirm, setConfirm] = useState(false);
    const [linkData, setLinkData] = useState({});

    const { auth, darkMode } = useAppContext();
    const axiosPrivate = useAxiosPrivate();

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

    const handleDelete = async () => {
        try {
            const response = await axiosPrivate.delete(
                `/posts/getPost/${post_id}`,
                {
                    withCredentials: true,
                }
            );

            navigate("/");
        } catch (err) {
            // setNotif("Delete post failed");
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setSaved(!saved);
    };

    return (
        <div className="bg-light-1 dark:text-light-1 dark:bg-dark-2 md:p-4 md:rounded-md w-full md:max-w-[1000px] flex-col flex justify-between">
            {confirm && (
                <div className="flex flex-col w-[100vw] h-[100vh] absolute top-0 left-0  backdrop-blur-sm ">
                    <div className="absolute top-0 bottom-0 left-0 right-0 m-auto text-center max-w-max max-h-min md:rounded-lg bg-light-1 dark:bg-dark-2">
                        <h1 className="text-3xl p-8 border-b-light-2 dark:border-b-dark-3 border-b-2">
                            Confirm Delete?
                        </h1>
                        <div className="flex text-2xl">
                            <button
                                onClick={() => handleDelete()}
                                className="w-1/2 p-4 hover:bg-[red] rounded-bl-lg"
                            >
                                DELETE
                            </button>
                            <button
                                onClick={() => setConfirm(false)}
                                className="w-1/2 p-4 hover:bg-light-3 dark:hover:bg-dark-3 rounded-br-lg"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col p-4 md:p-0">
                <h1 className="text-xl md:text-2xl  font-semibold mb-2">
                    {title}
                </h1>
                <div className="flex flex-col md:flex-row md:gap-8 mb-2">
                    <p
                        className="text-green-1 hover:underline w-min dark:text-green-1 cursor-pointer"
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
                <pre className=" bg-light-3 dark:bg-dark-3 overflow-hidden p-4 text-lg md:rounded-md h-full dark:text-light-2">
                    {self_text}
                </pre>
            )}

            {link && (
                <a
                    href={link}
                    className="max-h-[480px]   cursor-pointer bg-light-3 dark:bg-dark-3 text-center overflow-hidden p-4 text-lg md:rounded-md h-full dark:text-light-2"
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
            <div className="flex justify-between mt-4 py-4 md:py-0 px-6 max-w-[400px]">
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
                {auth?.username === username && (
                    <button
                        className="flex align-middle"
                        onClick={() => setConfirm(true)}
                    >
                        <Icon
                            path={trashcan}
                            fill={darkMode ? "#c4c4c4" : "#161617"}
                            stroke={darkMode ? "#c4c4c4" : "#161617"}
                            w={"30px"}
                            h={"30px"}
                        />
                    </button>
                )}
                {auth?.username === username && self_text != "" && (
                    <button
                        className="flex align-middle"
                        onClick={(e) => handleEdit(e)}
                    >
                        <Icon
                            path={editIcon}
                            fill={darkMode ? "#c4c4c4" : "#161617"}
                            stroke={darkMode ? "#c4c4c4" : "#161617"}
                            w={"30px"}
                            h={"30px"}
                        />
                    </button>
                )}
            </div>
        </div>
    );
};

export default PostContent;