import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPostAge } from "../utils/getPostAge";
import CommentButtonBar from "./CommentButtonBar";

const Comment = ({
    username,
    comment_id,
    depth,
    karma,
    age,
    path,
    comment_text,
}) => {
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const getDepth = (path) => {
        return path.split("/").length - 1;
    };

    const cutPath = (path) => {
        let arr = path.split("/");
        arr.shift();
        return arr.join("/");
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        setShowEditForm(!showEditForm);
    };

    return (
        <div className=" dark:text-light-2 ">
            {getDepth(path) > 1 ? (
                <div className={`${depth + 1 === 1 ? "ml-0" : "ml-1"} md:ml-4`}>
                    {depth < 10 && (
                        <Comment
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
                                <h1>{username}</h1>
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
                                {comment_text}
                            </pre>

                            <CommentButtonBar
                                setConfirm={setConfirm}
                                handleEditClick={handleEditClick}
                                username={username}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Comment;
