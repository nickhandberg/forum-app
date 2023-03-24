import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import axios from "../utils/axios";
import Comment from "./Comment";

const CommentFeed = ({ post_id }) => {
    const [comments, setComments] = useState([]);
    const { darkMode } = useAppContext();

    useEffect(() => {}, [comments]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getComments = async () => {
            try {
                const response = await axios.get(`/comments/${post_id}`, {
                    signal: controller.signal,
                });
                isMounted && setComments(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (post_id) {
            getComments();
        }

        return () => {
            isMounted = false;
            isMounted && controller.abort();
        };
    }, [post_id]);

    const filterComments = (id) => {
        let c = [];
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].path.includes(id)) {
                let arr = comments[i].path.split(id);
                console.log(arr);
                comments[i].path = `/${id}${arr[1] ? arr[1] : ""}`;
                c.push(comments[i]);
            }
        }

        setComments(c);
    };

    return (
        <div className="flex flex-col gap-2 py-6 w-full">
            {comments.map((comment, i) => (
                <Comment
                    key={i}
                    username={comment.username}
                    comment_id={comment.comment_id}
                    depth={0}
                    karma={0}
                    age={comment.post_date}
                    path={comment.path}
                    comment_text={comment.comment_text}
                    darkMode={darkMode}
                    filterComments={filterComments}
                />
            ))}
        </div>
    );
};

export default CommentFeed;
