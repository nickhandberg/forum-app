import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import useAppContext from "../hooks/useAppContext";
import {
    altDownvote,
    altUpvote,
    dotMenu,
    editIcon,
    replyIcon,
    signIn,
    trashcan,
} from "../img/iconPaths";

const CommentButtonBar = ({
    handleEditClick,
    handleCommentClick,
    handleDelete,
    username,
}) => {
    const { auth, darkMode } = useAppContext();
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [showContextMenu, setShowContextMenu] = useState(false);
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

    const handleContextMenu = (e) => {
        e.stopPropagation();
        setShowContextMenu(!showContextMenu);
    };

    const redirect = (e, path) => {
        e.stopPropagation();
        navigate(path);
    };

    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-6 md:gap-14">
                <button
                    className="flex align-middle"
                    onClick={() => handleCommentClick()}
                >
                    <Icon
                        path={replyIcon}
                        fill={darkMode ? "#c4c4c4" : "#68696b"}
                        stroke={darkMode ? "#c4c4c4" : "#68696b"}
                        w={"30px"}
                        h={"30px"}
                    />
                </button>

                <button
                    onClick={(e) => {
                        handleUpvote(e);
                    }}
                >
                    <Icon
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
                        w={"30px"}
                        h={"30px"}
                    />
                </button>

                <button
                    onClick={(e) => {
                        handleDownvote(e);
                    }}
                >
                    <Icon
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
                        w={"30px"}
                        h={"30px"}
                    />
                </button>

                <div className="relative">
                    <button
                        onClick={(e) => {
                            handleContextMenu(e);
                        }}
                        className="block"
                    >
                        <Icon
                            path={dotMenu}
                            fill={darkMode ? "#c4c4c4" : "#68696b"}
                            stroke={darkMode ? "#c4c4c4" : "#68696b"}
                            w={"25px"}
                            h={"25px"}
                        />
                    </button>
                    {showContextMenu && (
                        <div className="absolute z-20 right-[-16px] text-xl dark:text-light-2 bg-light-1 dark:bg-dark-2 border-b-2 border-x-2 border-dark-1 dark:border-dark-3 flex flex-col top-[51px]">
                            <button
                                className="flex items-center gap-2 p-5 hover:bg-dark-3"
                                onClick={(e) => {
                                    redirect(e, `/u/${username}`);
                                }}
                            >
                                <Icon
                                    path={signIn}
                                    fill={darkMode ? "#c4c4c4" : "#161617"}
                                    stroke={darkMode ? "#c4c4c4" : "#161617"}
                                    w={"30px"}
                                    h={"30px"}
                                />
                                {username}
                            </button>

                            {auth?.username === username && (
                                <button
                                    className="flex items-center gap-2 p-5 hover:bg-dark-3"
                                    onClick={(e) => {
                                        setShowContextMenu(false);
                                        handleEditClick(e);
                                    }}
                                >
                                    <Icon
                                        path={editIcon}
                                        fill={darkMode ? "#c4c4c4" : "#161617"}
                                        stroke={
                                            darkMode ? "#c4c4c4" : "#161617"
                                        }
                                        w={"30px"}
                                        h={"30px"}
                                    />
                                    Edit
                                </button>
                            )}
                            {auth?.username === username && (
                                <button
                                    className="flex items-center gap-2 p-5 hover:bg-dark-3"
                                    onClick={() => handleDelete()}
                                >
                                    <Icon
                                        path={trashcan}
                                        fill={darkMode ? "#c4c4c4" : "#161617"}
                                        stroke={
                                            darkMode ? "#c4c4c4" : "#161617"
                                        }
                                        w={"30px"}
                                        h={"30px"}
                                    />
                                    Delete
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentButtonBar;
