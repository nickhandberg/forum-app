import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentFeed from "../components/CommentFeed";
import PostContent from "../components/PostContent";
import useAppContext from "../hooks/useAppContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../utils/axios";

const Post = () => {
    const { auth, darkMode } = useAppContext();
    const [post, setPost] = useState([]);
    let { post_id } = useParams();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getPosts = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/posts/${
                        auth?.accessToken ? "private/" : ""
                    }getPost/${parseInt(post_id, 32)}`,
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
    }, [auth.accessToken]);

    return (
        <div className="flex-col flex items-center justify-center max-w-[1000px] pt-[60px] m-auto">
            <PostContent
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
            <CommentFeed post_id={post.post_id} />
        </div>
    );
};

export default Post;
