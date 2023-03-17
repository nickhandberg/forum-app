import React from "react";
import { useParams } from "react-router-dom";

const MissingChannel = () => {
    const { channel } = useParams();

    return (
        <div className="flex flex-col pt-[100px] justify-center items-center">
            <div className="bg-light-1 dark:bg-dark-2 w-full max-w-[800px] text-center text-dark-1 md:rounded-lg dark:text-light-1 mb-12">
                <h1 className="text-3xl">Channel {channel} not found</h1>
            </div>
        </div>
    );
};

export default MissingChannel;
