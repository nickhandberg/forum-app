import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const PostTypes = {
    text: 1,
    link: 2,
    image: 3,
};

const CreatePost = () => {
    const [postType, setPostType] = useState(PostTypes.text);

    const [title, setTitle] = useState("");
    const [selfText, setSelfText] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState("");

    const axiosPrivate = useAxiosPrivate();
    let { channel } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            channel_name: channel,
            image_link: image,
            title: title,
            self_text: selfText,
            link: link,
        };
        try {
            const response = await axiosPrivate.post(
                "/posts/",
                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            navigate(`/c/${channel}/${response.data.post_id.toString(32)}`);
        } catch (err) {
            setNotif("Create new post failed");
        }
    };

    return (
        <div className="flex justify-center pt-[100px]">
            <div className="bg-light-1 dark:bg-dark-2 w-full max-w-[800px] text-dark-1 md:rounded-lg dark:text-light-1 mb-12">
                <div className="p-4">
                    <h1 className="text-3xl ">Create post</h1>
                    <h2 className="text-xl">in {channel}</h2>
                </div>

                <div className="flex bg-light-2  dark:bg-dark-3 text-xl md:text-2xl  text-center">
                    <button
                        onClick={() => setPostType(PostTypes.text)}
                        className={`${
                            postType === PostTypes.text ? "bg-green-1" : ""
                        } w-1/3 p-2 md:p-4 border-l-[4px] border-light-1 dark:border-dark-2`}
                    >
                        Text
                    </button>
                    <button
                        onClick={() => setPostType(PostTypes.link)}
                        className={`${
                            postType === PostTypes.link ? "bg-green-1" : ""
                        } w-1/3 p-2 md:p-4 border-x-[4px] border-light-1 dark:border-dark-2`}
                    >
                        Link
                    </button>
                    <button
                        onClick={() => setPostType(PostTypes.image)}
                        className={`${
                            postType === PostTypes.image ? "bg-green-1" : ""
                        } w-1/3 p-2 md:p-4 border-r-[4px] border-light-1 dark:border-dark-2`}
                    >
                        Image
                    </button>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2 p-4"
                >
                    <label className="text-2xl" htmlFor="title">
                        {"Title:"}
                    </label>
                    <input
                        className="bg-light-3 dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                        type="text"
                        id="title"
                        autoComplete="off"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                    {postType === PostTypes.text && (
                        <div className="flex flex-col gap-2">
                            <label className="text-2xl" htmlFor="selfText">
                                {"Text:"}
                            </label>
                            <textarea
                                className="bg-light-3 overflow-hidden dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                                rows="12"
                                id="selfText"
                                autoComplete="off"
                                onChange={(e) => setSelfText(e.target.value)}
                                value={selfText}
                                required={postType === PostTypes.text}
                            />
                        </div>
                    )}

                    {postType === PostTypes.link && (
                        <div className="flex flex-col gap-2">
                            <label className="text-2xl" htmlFor="link">
                                {"Link:"}
                            </label>
                            <input
                                className="bg-light-3 dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                                type="text"
                                id="link"
                                autoComplete="off"
                                onChange={(e) => setLink(e.target.value)}
                                value={link}
                                required={postType === PostTypes.link}
                            />
                        </div>
                    )}
                    {postType === PostTypes.image && (
                        <div className="flex flex-col gap-2">
                            <label className="text-2xl" htmlFor="image">
                                {"Image:"}
                            </label>
                            <input
                                className="bg-light-3 dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                                type="text"
                                id="image"
                                autoComplete="off"
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                                required={postType === PostTypes.image}
                            />
                        </div>
                    )}
                    <button
                        className={`${
                            !title ||
                            (postType === PostTypes.text && !selfText) ||
                            (postType === PostTypes.link && !link) ||
                            (postType === PostTypes.image && !image)
                                ? "bg-light-2 dark:bg-dark-3"
                                : "bg-green-1 text-dark-1"
                        }  mt-4 rounded-lg text-2xl p-2`}
                        disabled={
                            !title ||
                            (postType === PostTypes.text && !selfText) ||
                            (postType === PostTypes.link && !link) ||
                            (postType === PostTypes.image && !image)
                                ? true
                                : false
                        }
                    >
                        Create Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
