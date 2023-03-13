import React, { useEffect, useState } from "react";
import Post from "./Post";

const Feed = ({ channel, showGrid, darkMode }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_API_BASE}/posts/${channel ? channel : ""}`,
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
            });
    }, []);

    return (
        <div>
            <div
                className={`grid ${
                    showGrid
                        ? "xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
                        : "grid-cols-1 max-w-[800px] m-auto w-full"
                } gap-3`}
            >
                {posts.map((post) => (
                    <Post
                        channel={post.channel_name}
                        username={post.username}
                        image={post.image_link}
                        link={post.link}
                        selfText={post.self_text}
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
