import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../utils/axios";

import PostCard from "./PostCard";

const Feed = ({ param, feedType, setMissing }) => {
    const [posts, setPosts] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const { auth, darkMode, showGrid } = useAppContext();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getPosts = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/posts/${auth?.accessToken ? "private" : ""}`,
                    {
                        params: {
                            type: `${feedType}`,
                            value: `${param}`,
                        },
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
    }, [param, auth.accessToken]);

    return (
        <div>
            <div
                className={`gap-3 columns-1 ${
                    showGrid
                        ? "xl:columns-3 md:columns-2 columns-1"
                        : "columns-1 max-w-[800px] m-auto w-full"
                }`}
            >
                {posts.map((post, i) => (
                    <PostCard
                        key={i}
                        vote={post.vote ? post.vote : 0}
                        post_id={post.post_id}
                        channel={post.channel_name}
                        username={post.username}
                        image={post.image_link}
                        link={post.link}
                        self_text={post.self_text}
                        title={post.title}
                        age={post.post_date}
                        karma={post.karma}
                        comment_cnt={post.comment_cnt}
                        darkMode={darkMode}
                    />
                ))}
            </div>
        </div>
    );
};

export default Feed;
