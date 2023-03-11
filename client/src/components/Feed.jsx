import React from "react";
import Post from "./Post";

const Feed = ({ showGrid }) => {
    return (
        <div>
            <div
                className={`grid ${
                    showGrid
                        ? "xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
                        : "grid-cols-1 max-w-[800px] m-auto w-full"
                } gap-3`}
            >
                <Post
                    image="https://i.redd.it/9lkcthk9qyma1.jpg"
                    link=""
                    selfText=""
                    title="I think it's done"
                    age="11 hours"
                    channel="battlestations"
                />
                <Post
                    link=""
                    selfText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    title="Check out this news"
                    age="11 hours"
                    channel="news"
                />
                <Post
                    link="https://www.pcgamer.com/epic-games-ceo-says-ai-companies-shouldnt-be-hoovering-up-everybodys-art-data/"
                    title="Epic Games CEO says AI companies shouldn't be 'hoovering up everybody's art data'"
                    age="11 hours"
                    channel="pcgaming"
                />
                <Post
                    image="https://i.redd.it/9lkcthk9qyma1.jpg"
                    title="I think it's done"
                    age="11 hours"
                />
                <Post
                    image="https://i.redd.it/9lkcthk9qyma1.jpg"
                    title="I think it's done"
                    age="11 hours"
                />
            </div>
        </div>
    );
};

export default Feed;
