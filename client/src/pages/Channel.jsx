import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Feed from "../components/Feed";
import Icon from "../components/Icon";
import useAppContext from "../hooks/useAppContext";
import {
    card,
    grid,
    joinedIcon,
    joinIcon,
    newPostIcon,
} from "../img/iconPaths";

import { useNavigate } from "react-router-dom";
import MissingChannel from "../components/MissingChannel";

const Channel = () => {
    const { darkMode, showGrid, setShowGrid } = useAppContext();
    const [userJoined, setUserJoined] = useState(false);
    const [missing, setMissing] = useState(false);
    let { channel } = useParams();
    let navigate = useNavigate();

    const handleChannelJoin = () => {
        setUserJoined(!userJoined);
    };
    return (
        <section className="py-16 md:mx-8">
            {missing ? (
                <MissingChannel darkMode={darkMode} />
            ) : (
                <>
                    <div className=" py-8 m-auto max-w-[1800px] items-center flex flex-col gap-4 md:flex-row md:gap-0 text-dark-1 dark:text-light-1 justify-around">
                        <div className="flex flex-col">
                            <p>welcome to</p>
                            <div className="flex gap-2">
                                <h1 className="text-3xl font-semibold">
                                    {channel}
                                </h1>
                                <button onClick={() => handleChannelJoin()}>
                                    <Icon
                                        path={
                                            userJoined ? joinedIcon : joinIcon
                                        }
                                        fill={
                                            userJoined
                                                ? "#4db010"
                                                : darkMode
                                                ? "#e6e8eb"
                                                : "#161617"
                                        }
                                        stroke={
                                            userJoined
                                                ? "#4db010"
                                                : darkMode
                                                ? "#e6e8eb"
                                                : "#161617"
                                        }
                                        w={"30px"}
                                        h={"30px"}
                                    />
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(`/c/${channel}/newpost`)}
                            className="bg-light-1 dark:bg-dark-3 flex justify-center items-center px-4 p-2 gap-2 rounded-xl"
                        >
                            <Icon
                                path={newPostIcon}
                                fill={darkMode ? "#e6e8eb" : "#161617"}
                                stroke={darkMode ? "#e6e8eb" : "#161617"}
                                w={"30px"}
                                h={"30px"}
                            />
                            <p className="text-lg font-semibold">New Post</p>
                        </button>
                    </div>
                    <div className="hidden md:flex">
                        <button
                            onClick={() => setShowGrid(!showGrid)}
                            className="mb-2"
                        >
                            <Icon
                                path={showGrid ? card : grid}
                                fill={darkMode ? "#c4c4c4" : "#161617"}
                                stroke={darkMode ? "#c4c4c4" : "#161617"}
                                w={"30px"}
                                h={"30px"}
                            />
                        </button>
                    </div>
                    <Feed
                        param={channel}
                        showGrid={showGrid}
                        darkMode={darkMode}
                        setMissing={setMissing}
                    />
                </>
            )}
        </section>
    );
};

export default Channel;
