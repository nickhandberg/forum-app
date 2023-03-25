import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import useAppContext from "../hooks/useAppContext";
import axios from "../utils/axios";

const CommentDetails = () => {
    const [comments, setComments] = useState([]);
    const { darkMode } = useAppContext();
    const { comment_id } = useParams();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getComments = async () => {
            try {
                const response = await axios.get(
                    `/comments/getComment/${comment_id}`,
                    {
                        signal: controller.signal,
                    }
                );
                isMounted && setComments(response.data);
                console.log(response.data);
            } catch (err) {
                if (err.response?.status === 404) {
                    setMissing(true);
                } else {
                    console.error(err);
                }
            }
        };
        getComments();

        return () => {
            isMounted = false;
            isMounted && controller.abort();
        };
    }, [comment_id]);

    return (
        <div className="flex-col flex items-center justify-center max-w-[1000px] pt-[60px] m-auto">
            <div className="flex flex-col gap-2 py-6 w-full">
                {comments.map((comment, i) => (
                    <Comment
                        key={i}
                        post_id={comment.post_id}
                        username={comment.username}
                        comment_id={comment.comment_id}
                        karma={0}
                        age={comment.post_date}
                        depth={0}
                        path={comment.path}
                        comment_text={comment.comment_text}
                        darkMode={darkMode}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentDetails;
