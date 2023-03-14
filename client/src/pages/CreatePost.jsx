import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CreatePost = () => {
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
            <h1 className="text-center text-3xl pt-[100px]">
                {" "}
                Create post in {channel}
            </h1>
        </div>
    );
};

export default CreatePost;
