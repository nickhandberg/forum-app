import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Feed from "../components/Feed";
import Icon from "../components/Icon";
import useAppContext from "../hooks/useAppContext";
import { card, grid } from "../img/iconPaths";

import { useNavigate } from "react-router-dom";
import MissingUser from "../components/MissingUser";

const User = () => {
    const { darkMode, showGrid, setShowGrid } = useAppContext();
    const [missing, setMissing] = useState(false);
    let { username } = useParams();

    return (
        <section className="py-16 md:mx-8">
            {missing ? (
                <MissingUser darkMode={darkMode} />
            ) : (
                <>
                    <div className=" py-8 m-auto max-w-[1800px] items-center flex flex-col gap-4 md:flex-row md:gap-0 text-dark-1 dark:text-light-1 justify-around">
                        <div className="flex flex-col">
                            <p>profile of</p>

                            <h1 className="text-3xl font-semibold">
                                {username}
                            </h1>
                        </div>
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
                        param={username}
                        feedType={"user"}
                        setMissing={setMissing}
                    />
                </>
            )}
        </section>
    );
};

export default User;
