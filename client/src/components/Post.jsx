import React from "react";

const Post = ({ image, link, selfText, title, age, channel }) => {
    return (
        <div className="bg-light-1 dark:bg-dark-2 p-4  rounded-md flex-col flex justify-between">
            <h1 className="text-2xl dark:text-light-1 font-semibold mb-2">
                {title}
            </h1>

            {image && (
                <img className="max-h-[480px] rounded-md" src={image}></img>
            )}

            {selfText && (
                <p className="bg-light-3 dark:bg-dark-3 max-h-[480px] overflow-hidden p-4 text-lg rounded-md h-full dark:text-light-2">
                    {selfText}
                </p>
            )}

            {link && (
                <a
                    href={link}
                    className="bg-light-3 dark:bg-dark-3 max-h-[480px] text-center overflow-hidden p-4 text-lg rounded-md h-full dark:text-light-2"
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

            <div className="flex gap-8 mt-2">
                <a className="text-green-2 dark:text-green-1" href="">
                    {channel}
                </a>
                <p className="dark:text-light-2">Posted by u/noko {age} ago</p>
            </div>
        </div>
    );
};

export default Post;
