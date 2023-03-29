import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import useAppContext from "../hooks/useAppContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
    altDownvote,
    altUpvote,
    channelIcon,
    dotMenu,
    editIcon,
    replyIcon,
    signIn,
    trashcan,
} from "../img/iconPaths";

const ButtonBar = ({
    vote,
    post_id,
    isCard,
    karma,
    setConfirm,
    handleEditClick,
    handleCommentClick,
    username,
    channel,
    isSelfText,
    comment_cnt,
}) => {
    const { auth, darkMode } = useAppContext();
    const [upvoted, setUpvoted] = useState(vote > 0 ? true : false);
    const [downvoted, setDownvoted] = useState(vote < 0 ? true : false);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [tempKarma, setTempKarma] = useState(karma);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        setTempKarma(karma);
    }, [karma]);

    useEffect(() => {
        vote > 0 ? setUpvoted(true) : vote < 0 ? setDownvoted(true) : null;
    }, [vote]);

    const handleUpvote = (e) => {
        e.stopPropagation();
        setUpvoted(!upvoted);
        setDownvoted(false);
        if (!upvoted) {
            setTempKarma(parseInt(tempKarma) + (downvoted ? 2 : 1));
            placeVote(1);
        } else {
            setTempKarma(parseInt(tempKarma) - 1);
            placeVote(0);
        }
    };
    const handleDownvote = (e) => {
        e.stopPropagation();
        setDownvoted(!downvoted);
        setUpvoted(false);
        if (!downvoted) {
            setTempKarma(parseInt(tempKarma) - (upvoted ? 2 : 1));
            placeVote(-1);
        } else {
            setTempKarma(parseInt(tempKarma) + 1);
            placeVote(0);
        }
    };

    const handleContextMenu = (e) => {
        e.stopPropagation();
        setShowContextMenu(!showContextMenu);
    };

    const placeVote = async (i) => {
        try {
            const data = { vote: i };
            const response = await axiosPrivate.post(
                `/posts/getPost/${post_id}`,
                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
        } catch (err) {
            console.log(err);
            // setNotif("Delete post failed");
        }
    };

    const redirect = (e, path) => {
        e.stopPropagation();
        navigate(path);
    };

    return (
        <div className="flex justify-between mt-4 pb-4  px-4">
            <div className="flex flex-col text-xs md:text-sm dark:text-light-2">
                <p
                    className={
                        downvoted
                            ? "text-[#d90f63]"
                            : upvoted
                            ? "text-[#6fc938]"
                            : ""
                    }
                >
                    {karma > 1000 ? (karma / 1000).toFixed(1) + "k" : tempKarma}{" "}
                    points
                </p>
                <p>
                    {comment_cnt ? comment_cnt : 0}{" "}
                    {comment_cnt === "1" ? "comment" : "comments"}
                </p>
            </div>

            <div className="flex items-center gap-6 md:gap-14">
                {!isCard && (
                    <button
                        className="flex align-middle"
                        onClick={() => handleCommentClick()}
                    >
                        <Icon
                            path={replyIcon}
                            fill={darkMode ? "#c4c4c4" : "#68696b"}
                            stroke={darkMode ? "#c4c4c4" : "#68696b"}
                            w={"35px"}
                            h={"35px"}
                        />
                    </button>
                )}

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
                            w={"30px"}
                            h={"30px"}
                        />
                    </button>
                    {showContextMenu && (
                        <div className="absolute z-20 right-[-16px] text-xl dark:text-light-2 bg-light-1 dark:bg-dark-2 border-b-2 border-x-2 border-dark-1 dark:border-dark-3 flex flex-col top-[51px]">
                            <button
                                className="flex items-center p-5 hover:bg-light-2 dark:hover:bg-dark-3 gap-2"
                                onClick={(e) => {
                                    redirect(e, `/c/${channel}`);
                                }}
                            >
                                <Icon
                                    path={channelIcon}
                                    fill={darkMode ? "#c4c4c4" : "#161617"}
                                    stroke={darkMode ? "#c4c4c4" : "#161617"}
                                    w={"30px"}
                                    h={"30px"}
                                />
                                {channel}
                            </button>

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

                            {auth?.username === username &&
                                isSelfText &&
                                !isCard && (
                                    <button
                                        className="flex items-center gap-2 p-5 hover:bg-dark-3"
                                        onClick={() => {
                                            handleEditClick();
                                        }}
                                    >
                                        <Icon
                                            path={editIcon}
                                            fill={
                                                darkMode ? "#c4c4c4" : "#161617"
                                            }
                                            stroke={
                                                darkMode ? "#c4c4c4" : "#161617"
                                            }
                                            w={"30px"}
                                            h={"30px"}
                                        />
                                        Edit
                                    </button>
                                )}
                            {auth?.username === username && !isCard && (
                                <button
                                    className="flex items-center gap-2 p-5 hover:bg-dark-3"
                                    onClick={() => setConfirm(true)}
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

export default ButtonBar;
