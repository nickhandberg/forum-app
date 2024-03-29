import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import useAppContext from "../hooks/useAppContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { linkExternal } from "../img/iconPaths";
import { getDomain } from "../utils/getDomain";
import { getPostAge } from "../utils/getPostAge";
import ButtonBar from "./ButtonBar";
import TitleBar from "./TitleBar";

const PostContent = ({
    vote,
    post_id,
    channel,
    username,
    image,
    link,
    self_text,
    title,
    age,
    karma,
    comment_cnt,
}) => {
    const [confirm, setConfirm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editedText, setEditedText] = useState(self_text);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [comment, setComment] = useState("");
    const editRef = useRef();
    const commentRef = useRef();

    const { auth, darkMode } = useAppContext();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        editRef?.current?.focus();
        commentRef?.current?.focus();
    }, [showEditForm, showCommentForm]);

    const handleEditClick = () => {
        if (!auth?.username) {
            navigate("/login", { state: { from: location } });
        }
        setShowCommentForm(false);
        setShowEditForm(!showEditForm);
    };
    const handleCommentClick = () => {
        if (!auth?.username) {
            navigate("/login", { state: { from: location } });
        }
        setShowEditForm(false);
        setShowCommentForm(!showCommentForm);
    };

    const handleDelete = async () => {
        try {
            const response = await axiosPrivate.delete(
                `/posts/getPost/${post_id}`,
                {
                    withCredentials: true,
                }
            );

            navigate("/");
        } catch (err) {
            // setNotif("Delete post failed");
        }
    };

    const handleEdit = async (e) => {
        e.stopPropagation();
        try {
            const data = { self_text: editedText };
            const response = await axiosPrivate.put(
                `/posts/getPost/${post_id}`,

                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            navigate(`/c/${channel}/${post_id}`);
        } catch (err) {
            // setNotif("Update post failed");
        }
    };

    const handleComment = async () => {
        try {
            const data = { parent_id: null, comment_text: comment };
            const response = await axiosPrivate.post(
                `/comments/${post_id}`,

                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
        } catch (err) {
            //console.log(err)
        }
    };

    return (
        <div className="bg-light-1 dark:text-light-1 dark:bg-dark-2  md:rounded-md w-full md:max-w-[1000px] flex-col flex justify-between">
            {confirm && (
                <div className="flex flex-col w-[100vw] h-[100vh] absolute top-0 left-0 z-30 backdrop-blur-sm ">
                    <div className="absolute top-0 bottom-0 left-0 right-0 m-auto text-center max-w-max max-h-min md:rounded-lg bg-light-1 dark:bg-dark-2">
                        <h1 className="text-3xl p-8 border-b-light-2 dark:border-b-dark-3 border-b-2">
                            Delete Post?
                        </h1>
                        <div className="flex text-2xl">
                            <button
                                onClick={() => handleDelete()}
                                className="w-1/2 p-4 hover:bg-[red] rounded-bl-lg"
                            >
                                DELETE
                            </button>
                            <button
                                onClick={() => setConfirm(false)}
                                className="w-1/2 p-4 hover:bg-light-3 dark:hover:bg-dark-3 rounded-br-lg"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {image && !link && (
                <img className=" max-h-[720px] w-auto m-auto" src={image}></img>
            )}

            {link && !image && (
                <a
                    href={link}
                    className="max-h-[480px]   cursor-pointer bg-light-3 dark:bg-dark-3 text-center overflow-hidden p-4 text-lg md:rounded-md h-full dark:text-light-2"
                >
                    <Icon
                        path={linkExternal}
                        fill={darkMode ? "#c4c4c4" : "#161617"}
                        stroke={darkMode ? "#c4c4c4" : "#161617"}
                        w={"15vw"}
                        h={"15vw"}
                    />
                    <br />
                    {link}
                </a>
            )}

            {link && image && (
                <div>
                    <a
                        href={link}
                        className="max-h-[720px] cursor-pointer bg-light-3 dark:bg-dark-3 overflow-hidden text-lg md:rounded-md h-ful"
                    >
                        <img
                            className="w-min m-auto min-h-[200px] md:rounded-t-md"
                            src={image}
                        ></img>
                        <div className="relative backdrop-brightness-50 backdrop-blur-sm p-4 bottom-0 h-[60px] mt-[-60px]">
                            <p className="text-xl text-light-1 md:text-3xl">
                                {getDomain(link)}
                            </p>
                        </div>
                    </a>
                </div>
            )}

            <TitleBar
                title={title}
                channel={channel}
                username={username}
                age={age}
            />

            {self_text && (
                <pre className=" overflow-hidden p-4 text-base md:text-lg md:rounded-md h-full dark:text-light-2">
                    {self_text}
                </pre>
            )}

            <ButtonBar
                vote={vote}
                post_id={post_id}
                karma={karma}
                comment_cnt={comment_cnt}
                setConfirm={setConfirm}
                handleEditClick={handleEditClick}
                handleCommentClick={handleCommentClick}
                username={username}
                channel={channel}
                isSelfText={self_text ? true : false}
            />

            {showEditForm && (
                <form onSubmit={handleEdit} className="flex flex-col gap-2 p-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-2xl" htmlFor="editedText">
                            {"Edit:"}
                        </label>
                        <textarea
                            className="bg-light-3 text-[2ch]  dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                            rows="12"
                            id="editedText"
                            autoComplete="off"
                            ref={editRef}
                            onChange={(e) => setEditedText(e.target.value)}
                            value={editedText}
                            required
                            defaultValue={self_text}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            className={`w-1/2 ${
                                !editedText
                                    ? "bg-light-2 dark:bg-dark-3"
                                    : "bg-green-1 text-dark-1"
                            }  mt-4 rounded-lg text-2xl p-2`}
                            disabled={!editedText ? true : false}
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowEditForm(false);
                            }}
                            className={`w-1/2 mt-4 bg-light-2 dark:bg-dark-3 rounded-lg text-2xl p-2`}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {showCommentForm && (
                <form
                    onSubmit={handleComment}
                    className="flex flex-col md:gap-2 md:p-4"
                >
                    <div className="flex flex-col gap-2">
                        <textarea
                            className="bg-light-3 text-base  dark:bg-dark-3 md:rounded-md p-2 "
                            rows="10"
                            id="commentText"
                            autoComplete="off"
                            ref={commentRef}
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            required
                            placeholder="Comment text"
                        />
                    </div>
                    <div className="flex gap-2 px-2 pb-2 md:px-0 md:pb-0">
                        <button
                            className={`w-1/2 ${
                                !comment
                                    ? "bg-light-2 dark:bg-dark-3"
                                    : "bg-green-1 text-dark-1"
                            }  mt-4 md:rounded-lg text-2xl p-2`}
                            disabled={!comment ? true : false}
                        >
                            Comment
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowCommentForm(false);
                            }}
                            className={`w-1/2 mt-4 bg-light-2 dark:bg-dark-3 md:rounded-lg text-2xl p-2`}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default PostContent;
