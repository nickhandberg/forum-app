import React from "react";
import Post from "./Post";

const images = [
    "https://i.redd.it/9lkcthk9qyma1.jpg",
    "",
    "",
    "https://preview.redd.it/tbgeu5sa1zma1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=5c1c7dfba72f2b87b5412e498d53043ce0304941",
    "https://preview.redd.it/rs6e8sgi20na1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=7fb6748a88c99e427f6d17110657bedc8e56db03",
];

const links = [
    "",
    "",
    "https://www.pcgamer.com/epic-games-ceo-says-ai-companies-shouldnt-be-hoovering-up-everybodys-art-data/",
    "",
    "",
];

const selfTexts = [
    "",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "",
    "",
    "",
];

const titles = [
    "I think it's done",
    "Check out this news",
    "Epic Games CEO says AI companies shouldn't be 'hoovering up everybody's art data'",
    "Solid week. I'm almost ready to graduate to wall street bets",
    "My first setup. Gonna change a lot soon starting with a bigger desk",
];

const channels = [
    "battlestations",
    "news",
    "pcgaming",
    "smallstreetbets",
    "battlestations",
];

const karmas = [1500, 3409, 13, 49, 0];

const Feed = ({ showGrid, darkMode }) => {
    return (
        <div>
            <div
                className={`grid ${
                    showGrid
                        ? "xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
                        : "grid-cols-1 max-w-[800px] m-auto w-full"
                } gap-3`}
            >
                {titles.map((title, i) => (
                    <Post
                        image={images[i]}
                        link={links[i]}
                        selfText={selfTexts[i]}
                        title={title}
                        age={"11 hours"}
                        channel={channels[i]}
                        karma={karmas[i]}
                        darkMode={darkMode}
                    />
                ))}
            </div>
        </div>
    );
};

export default Feed;
