import React from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import { linkExternal } from "../img/iconPaths";
import { getDomain } from "../utils/getDomain";
import ButtonBar from "./ButtonBar";
import Icon from "./Icon";
import TitleBar from "./TitleBar";

const PostCard = ({
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
    const { darkMode } = useAppContext();

    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/c/${channel}/${post_id.toString(32)}`)}
            className="bg-light-1 dark:bg-dark-2 break-inside-avoid cursor-pointer  mb-4 md:rounded-md flex-col flex justify-between"
        >
            {image && !link && (
                <img
                    className="max-h-[800px] w-full m-auto md:rounded-t-md"
                    src={image}
                ></img>
            )}

            {link && !image && (
                <div className="max-h-[480px]  cursor-pointer bg-light-3 dark:bg-dark-3 text-center overflow-hidden p-4 text-lg md:rounded-md h-full dark:text-light-2">
                    <Icon
                        path={linkExternal}
                        fill={darkMode ? "#c4c4c4" : "#161617"}
                        stroke={darkMode ? "#c4c4c4" : "#161617"}
                        w={"15vw"}
                        h={"15vw"}
                    />
                    <br />
                    {link}
                </div>
            )}
            {link && image && (
                <div>
                    <div className="max-h-[720px] cursor-pointer bg-light-3 dark:bg-dark-3 text-center overflow-hidden text-lg md:rounded-t-md h-full dark:text-light-2">
                        <img
                            className="w-min min-h-[200px] m-auto"
                            src={image}
                        ></img>
                    </div>
                    <div className="relative backdrop-brightness-50 backdrop-blur-sm p-4 bottom-0 h-[60px] mt-[-60px]">
                        <p className="text-xl text-light-1  md:text-3xl">
                            {getDomain(link)}
                        </p>
                    </div>
                </div>
            )}

            <TitleBar
                title={title}
                channel={channel}
                username={username}
                age={age}
            />

            {self_text && (
                <div>
                    <pre className="postText max-h-[250px] md:max-h-[300px] lg:max-h-[480px]  overflow-hidden px-4 pt-2 text-sm md:text-base md:rounded-md h-full dark:text-light-2">
                        {self_text}
                    </pre>
                </div>
            )}

            <ButtonBar
                vote={vote}
                post_id={post_id}
                isCard={true}
                karma={karma}
                comment_cnt={comment_cnt}
                username={username}
                channel={channel}
                self_text={self_text ? true : false}
            />
        </div>
    );
};

export default PostCard;
