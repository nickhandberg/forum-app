import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import axios from "../utils/axios";

import PostCard from "./PostCard";

const Feed = ({ param, feedType, setMissing }) => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const { darkMode, showGrid } = useAppContext();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getPosts = async () => {
            try {
                const response = await axios.get(
                    `/posts/${feedType === "user" ? "getByUser" : ""}/${
                        param ? param : ""
                    }`,
                    {
                        signal: controller.signal,
                    }
                );
                isMounted && setPosts(response.data);
            } catch (err) {
                if (err.response?.status === 404) {
                    setMissing(true);
                } else {
                    console.error(err);
                }
            }
        };
        getPosts();

        return () => {
            isMounted = false;
            isMounted && controller.abort();
        };
    }, [param]);

    return (
        <div>
            <div
                // className={`grid ${
                //     showGrid
                //         ? "xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
                //         : "grid-cols-1 max-w-[800px] m-auto w-full"
                // } gap-3`}
                className={`gap-3 columns-1 ${
                    showGrid
                        ? "xl:columns-3 md:columns-2 columns-1"
                        : "columns-1 max-w-[800px] m-auto w-full"
                }`}
            >
                {posts.map((post, i) => (
                    <PostCard
                        key={i}
                        post_id={post.post_id}
                        channel={post.channel_name}
                        username={post.username}
                        image={post.image_link}
                        link={post.link}
                        self_text={post.self_text}
                        title={post.title}
                        age={post.post_date}
                        karma={post.karma}
                        darkMode={darkMode}
                    />
                ))}
            </div>
        </div>
    );
};

export default Feed;
