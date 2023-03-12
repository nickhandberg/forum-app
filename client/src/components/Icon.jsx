import React from "react";

const Icon = ({ path, fill, stroke, w, h }) => {
    return (
        <div className="flex align-middle justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={w}
                height={h}
                viewBox="0 0 24 24"
                style={{ fill: fill, stroke: stroke, strokeWidth: "0.1" }}
            >
                {path.map((p) => (
                    <path d={p}></path>
                ))}
            </svg>
        </div>
    );
};

export default Icon;
