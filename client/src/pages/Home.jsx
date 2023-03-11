import React from "react";
import Feed from "../components/Feed";

const Home = ({ showGrid, setShowGrid, darkMode }) => {
    return (
        <div className="py-16 mx-8">
            <div className="hidden md:flex">
                <button onClick={() => setShowGrid(!showGrid)} className="mb-2">
                    {showGrid ? (
                        <box-icon
                            name="card"
                            size="30px"
                            color={darkMode ? "#c4c4c4" : "#161617"}
                        ></box-icon>
                    ) : (
                        <box-icon
                            name="grid-alt"
                            size="30px"
                            color={darkMode ? "#c4c4c4" : "#161617"}
                        ></box-icon>
                    )}
                </button>
            </div>
            <Feed showGrid={showGrid} darkMode={darkMode} />
        </div>
    );
};

export default Home;
