import React, { useState } from "react";

const Post = ({
    image,
    link,
    selfText,
    title,
    age,
    channel,
    karma,
    darkMode,
}) => {
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [saved, setSaved] = useState(false);

    return (
        <div className="bg-light-1 dark:bg-dark-2 p-4  rounded-md flex-col flex justify-between">
            <div className="flex flex-col">
                <h1 className="text-2xl dark:text-light-1 font-semibold mb-2">
                    {title}
                </h1>
                <div className="flex gap-8 mb-2">
                    <a className="text-green-2 dark:text-green-1" href="">
                        {channel}
                    </a>
                    <p className="dark:text-light-2">
                        Posted by u/noko {age} ago
                    </p>
                </div>
            </div>

            {image && (
                <img className=" max-h-[480px] w-min m-auto" src={image}></img>
            )}

            {selfText && (
                <p className="max-h-[480px] bg-light-3 dark:bg-dark-3 overflow-hidden p-4 text-lg rounded-md h-full dark:text-light-2">
                    {selfText}
                </p>
            )}

            {link && (
                <a
                    href={link}
                    className="max-h-[480px] bg-light-3 dark:bg-dark-3 text-center overflow-hidden p-4 text-lg rounded-md h-full dark:text-light-2"
                >
                    <box-icon
                        name="link-external"
                        size="200px"
                        color="#161617"
                    ></box-icon>{" "}
                    <br />
                    {link}
                </a>
            )}
            <div className="flex justify-between mt-4 px-6">
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            setUpvoted(!upvoted);
                            setDownvoted(false);
                        }}
                    >
                        <box-icon
                            name="upvote"
                            size="30px"
                            type="solid"
                            color={
                                upvoted
                                    ? "#6fc938"
                                    : darkMode
                                    ? "#c4c4c4"
                                    : "#161617"
                            }
                        ></box-icon>
                    </button>
                    <p className="dark:text-light-2 text-lg text-center">
                        {karma > 1000 ? (karma / 1000).toFixed(1) + "k" : karma}
                    </p>
                    <button
                        onClick={() => {
                            setDownvoted(!downvoted);
                            setUpvoted(false);
                        }}
                    >
                        <box-icon
                            name="downvote"
                            size="30px"
                            type="solid"
                            color={
                                downvoted
                                    ? "#d90f63"
                                    : darkMode
                                    ? "#c4c4c4"
                                    : "#161617"
                            }
                        ></box-icon>
                    </button>
                </div>
                <div className="flex gap-16">
                    <button>
                        <box-icon
                            name="comment"
                            size="30px"
                            color={darkMode ? "#c4c4c4" : "#161617"}
                        ></box-icon>
                    </button>
                    <button
                        className="flex align-middle"
                        onClick={() => setSaved(!saved)}
                    >
                        <box-icon
                            name="star"
                            size="30px"
                            type="solid"
                            color={
                                saved
                                    ? "#d6c106"
                                    : darkMode
                                    ? "#c4c4c4"
                                    : "#161617"
                            }
                        ></box-icon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;
