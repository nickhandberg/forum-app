import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import Post from "../components/Post";

const CreatePost = ({ showGrid, darkMode }) => {
    const [posts, setPosts] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    let { channel } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getPosts = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/posts/${channel ? channel : ""}`,
                    {
                        signal: controller.signal,
                    }
                );
                isMounted && setPosts(response.data);
            } catch (err) {
                console.error(err);
                navigate("/login", {
                    state: { from: location },
                    replace: true,
                });
            }
        };
        getPosts();

        return () => {
            isMounted = false;
            isMounted && controller.abort();
        };
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

export default CreatePost;
