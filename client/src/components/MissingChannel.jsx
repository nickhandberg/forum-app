import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dog } from "../img/iconPaths";
import Icon from "./Icon";

const MissingChannel = ({ darkMode }) => {
    const { channel } = useParams();
    const navigate = useNavigate();
    return (
        <div className="flex pt-[100px] justify-center items-center">
            <div className="bg-light-1 dark:bg-dark-2 flex flex-col gap-4 w-full max-w-[500px] p-4 text-center text-dark-1 md:rounded-lg dark:text-light-1 mb-12">
                <Icon
                    path={dog}
                    fill={darkMode ? "#c4c4c4" : "#363738"}
                    stroke={darkMode ? "#c4c4c4" : "#363738"}
                    w={"100px"}
                    h={"100px"}
                />
                <h1 className="text-4xl">Channel not found</h1>
                <p className="text-lg">but dont worry. You can create it!</p>
                <button
                    onClick={() => navigate(`/newChannel/${channel}`)}
                    className="p-4 text-2xl font-extrabold bg-green-1 text-dark-2 rounded-md"
                >
                    Create Channel
                </button>
            </div>
        </div>
    );
};

export default MissingChannel;
