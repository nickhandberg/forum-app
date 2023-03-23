import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentFeed from "../components/CommentFeed";
import Icon from "../components/Icon";
import PostContent from "../components/PostContent";
import useAppContext from "../hooks/useAppContext";
import {
    comment,
    downvote,
    downvoteFilled,
    linkExternal,
    star,
    starFilled,
    upvote,
    upvoteFilled,
} from "../img/iconPaths";
import axios from "../utils/axios";
import { getPostAge } from "../utils/getPostAge";

const Post = () => {
    const { darkMode } = useAppContext();

    const [post, setPost] = useState([]);

    let { channel, post_id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getPosts = async () => {
            try {
                const response = await axios.get(
                    `/posts/getPost/${parseInt(post_id, 32)}`,
                    {
                        signal: controller.signal,
                    }
                );
                isMounted && setPost(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        getPosts();

        return () => {
            isMounted = false;
            isMounted && controller.abort();
        };
    }, []);

    return (
        <div className="flex-col flex items-center justify-center max-w-[1000px] pt-[60px] m-auto">
            <PostContent
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
            <CommentFeed />
        </div>
    );
};

export default Post;
