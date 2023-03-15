import React from "react";
import { useParams } from "react-router-dom";
import Feed from "../components/Feed";
import Icon from "../components/Icon";
import useAppContext from "../hooks/useAppContext";
import { card, grid } from "../img/iconPaths";

const Home = () => {
    const { darkMode, showGrid, setShowGrid } = useAppContext();
    let { channel } = useParams();
    return (
        <div className="py-16 md:mx-8">
            <div className="hidden md:flex">
                <button onClick={() => setShowGrid(!showGrid)} className="mb-2">
                    <Icon
                        path={showGrid ? card : grid}
                        fill={darkMode ? "#c4c4c4" : "#161617"}
                        stroke={darkMode ? "#c4c4c4" : "#161617"}
                        w={"30px"}
                        h={"30px"}
                    />
                </button>
            </div>
            <Feed param={channel} showGrid={showGrid} darkMode={darkMode} />
        </div>
    );
};

export default Home;
