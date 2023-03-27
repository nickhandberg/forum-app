import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getPostAge } from "../utils/getPostAge";
import CommentButtonBar from "./CommentButtonBar";

const Comment = ({
    post_id,
    username,
    comment_id,
    depth,
    karma,
    age,
    path,
    comment_text,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showEditForm, setShowEditForm] = useState(false);
    const [editedText, setEditedText] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [comment, setComment] = useState("");
    const [isDeleted, setIsDeleted] = useState(false);
    const editRef = useRef();
    const commentRef = useRef();
    const { auth } = useAppContext();

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        editRef?.current?.focus();
        commentRef?.current?.focus();
    }, [showEditForm, showCommentForm]);

    useEffect(() => {}, [isDeleted]);

    useEffect(() => {
        if (comment_text === "[deleted]") setIsDeleted(true);
    }, []);

    const getDepth = (path) => {
        return path.split("/").length - 1;
    };

    const cutPath = (path) => {
        let arr = path.split("/");
        arr.shift();
        return arr.join("/");
    };

    const handleEditClick = () => {
        if (!auth.username) {
            navigate("/login", { state: { from: location } });
        }
        setShowCommentForm(false);
        setShowEditForm(!showEditForm);
    };
    const handleCommentClick = () => {
        if (!auth?.username) {
            navigate("/login", { state: { from: location } });
        }
        setShowEditForm(false);
        setShowCommentForm(!showCommentForm);
    };

    const handleComment = async () => {
        try {
            const data = { parent_id: comment_id, comment_text: comment };
            const response = await axiosPrivate.post(
                `/comments/${post_id}`,

                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axiosPrivate.delete(
                `/comments/getComment/${comment_id}`,
                {
                    withCredentials: true,
                }
            );
            setIsDeleted(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = async () => {
        try {
            const data = { comment_text: editedText };
            const response = await axiosPrivate.put(
                `/comments/getComment/${comment_id}`,

                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
        } catch (err) {
            // setNotif("Update post failed");
        }
    };

    return (
        <div className=" dark:text-light-2 ">
            {getDepth(path) > 1 ? (
                <div className={`${depth + 1 === 1 ? "ml-0" : "ml-1"} md:ml-4`}>
                    {depth < 10 && (
                        <Comment
                            post_id={post_id}
                            username={username}
                            comment_id={comment_id}
                            depth={depth + 1}
                            karma={karma}
                            age={age}
                            path={cutPath(path)}
                            comment_text={comment_text}
                        />
                    )}
                </div>
            ) : (
                <div
                    className={`flex flex-col bg-light-1 dark:bg-dark-2 p-2 md:rounded-md
                    ${depth == 0 ? "border-none" : "border-l-4"} 
                    ${(depth === 1 || depth === 6) && "border-c-blue"} 
                    ${(depth === 2 || depth === 7) && "border-c-orange"} 
                    ${(depth === 3 || depth === 8) && "border-c-green"} 
                    ${(depth === 4 || depth === 9) && "border-c-purple"} 
                    ${(depth === 5 || depth === 10) && "border-c-red"} `}
                >
                    {depth >= 10 ? (
                        <p
                            className="cursor-pointer"
                            onClick={() => navigate(`/comment/${comment_id}`)}
                        >
                            more comments
                        </p>
                    ) : (
                        <div className="px-0 md:px-2 pt-1">
                            <div className="flex gap-1 text-xs md:text-sm">
                                <h1>{isDeleted ? "[deleted]" : username}</h1>
                                <p>•</p>
                                <p>
                                    {karma > 1000
                                        ? (karma / 1000).toFixed(1) + "k"
                                        : karma}{" "}
                                    points
                                </p>
                                <p>•</p>
                                <p>{getPostAge(age)}</p>
                            </div>

                            <pre className="py-2 text-sm md:text-base">
                                {isDeleted ? "[deleted]" : comment_text}
                            </pre>
                            {!isDeleted && (
                                <CommentButtonBar
                                    handleEditClick={handleEditClick}
                                    handleCommentClick={handleCommentClick}
                                    handleDelete={handleDelete}
                                    username={username}
                                />
                            )}

                            {showCommentForm && (
                                <form
                                    onSubmit={handleComment}
                                    className="flex flex-col md:gap-2 md:p-4"
                                >
                                    <div className="flex flex-col gap-2">
                                        <textarea
                                            className="bg-light-3 text-base  dark:bg-dark-3 md:rounded-md p-2 "
                                            rows="10"
                                            id="commentText"
                                            autoComplete="off"
                                            ref={commentRef}
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                            value={comment}
                                            required
                                            placeholder="Comment text"
                                        />
                                    </div>
                                    <div className="flex gap-2 px-2 pb-2 md:px-0 md:pb-0">
                                        <button
                                            className={`w-1/2 ${
                                                !comment
                                                    ? "bg-light-2 dark:bg-dark-3"
                                                    : "bg-green-1 text-dark-1"
                                            }  mt-4 md:rounded-lg text-2xl p-2`}
                                            disabled={!comment ? true : false}
                                        >
                                            Comment
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowCommentForm(false);
                                            }}
                                            className={`w-1/2 mt-4 bg-light-2 dark:bg-dark-3 md:rounded-lg text-2xl p-2`}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                            {showEditForm && (
                                <form
                                    onSubmit={handleEdit}
                                    className="flex flex-col md:gap-2 md:p-4"
                                >
                                    <div className="flex flex-col md:gap-2">
                                        <textarea
                                            className="bg-light-3 text-[2ch]  dark:bg-dark-3 md:rounded-md text-base px-2 py-[2px]"
                                            rows="12"
                                            id="editedText"
                                            autoComplete="off"
                                            ref={editRef}
                                            onChange={(e) =>
                                                setEditedText(e.target.value)
                                            }
                                            value={editedText}
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            className={`w-1/2 ${
                                                !editedText
                                                    ? "bg-light-2 dark:bg-dark-3"
                                                    : "bg-green-1 text-dark-1"
                                            }  mt-4 md:rounded-lg text-2xl p-2`}
                                            disabled={
                                                !editedText ? true : false
                                            }
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowEditForm(false);
                                            }}
                                            className={`w-1/2 mt-4 bg-light-2 dark:bg-dark-3 md:rounded-lg text-2xl p-2`}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Comment;
