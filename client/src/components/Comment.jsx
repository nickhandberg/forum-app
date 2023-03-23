import React from "react";

const Comment = ({
    username,
    comment_id,
    depth,
    path,
    comment_text,
    filterComments,
}) => {
    const getDepth = (path) => {
        return path.split("/").length - 1;
    };

    const cutPath = (path) => {
        let arr = path.split("/");
        arr.shift();
        return arr.join("/");
    };

    return (
        <div className=" dark:text-light-2 ">
            {getDepth(path) > 1 ? (
                <div className={`${depth + 1 === 1 ? "ml-0" : "ml-1"} md:ml-4`}>
                    {depth < 10 && (
                        <Comment
                            username={username}
                            comment_id={comment_id}
                            depth={depth + 1}
                            path={cutPath(path)}
                            comment_text={comment_text}
                            filterComments={filterComments}
                        />
                    )}
                </div>
            ) : (
                <div
                    className={`flex flex-col bg-light-1 dark:bg-dark-2 p-2 md:rounded-md
                    ${depth == 0 ? "border-none" : "border-l-4"} 
                    ${(depth === 1 || depth === 6) && "border-c-blue"} 
                    ${(depth === 2 || depth === 7) && "border-c-orange"} 
                    ${(depth === 3 || depth === 8) && "border-c-green"} 
                    ${(depth === 4 || depth === 9) && "border-c-purple"} 
                    ${(depth === 5 || depth === 10) && "border-c-red"} `}
                >
                    {depth >= 10 ? (
                        <p
                            className="cursor-pointer"
                            onClick={() => filterComments(comment_id)}
                        >
                            more comments
                        </p>
                    ) : (
                        <div>
                            <h1>{username}</h1>
                            <p>{path}</p>
                            <p>{depth}</p>
                            <pre>{comment_text}</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Comment;
