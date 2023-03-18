import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const NAME_REGEX = /^[A-z][A-z0-9]{2,20}$/;

const CreateChannel = () => {
    const { channel } = useParams();
    const [name, setName] = useState(channel ? channel : "");
    const [validName, setValidName] = useState(false);
    const [notif, setNotif] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        const result = NAME_REGEX.test(name);
        setValidName(result);
    }, [name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            channel_name: name,
        };
        try {
            const response = await axiosPrivate.post(
                "/channels/",
                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            navigate(`/c/${name}`);
        } catch (err) {
            if (!err?.response) {
                setNotif("creating channel failed");
            } else if (err.response?.status === 409) {
                setNotif(`channel ${name} already exists`);
            }
        }
    };

    return (
        <div className="flex justify-center pt-[100px]">
            <div className="bg-light-1  p-4 dark:bg-dark-2 w-full max-w-[500px] text-dark-1 md:rounded-lg dark:text-light-1 mb-12">
                <div className="mb-2">
                    <h1 className="text-3xl">Create channel</h1>
                    <h2
                        className={`${
                            name.length > 15 ? "text-xs" : "text-lg"
                        } md:text-xl text-green-1 mt-2`}
                    >
                        /c/{name.toLowerCase()}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <label className="text-2xl" htmlFor="name">
                        {"Channel name:"}
                    </label>
                    <input
                        className="bg-light-3 dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                        type="text"
                        id="name"
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        maxLength="21"
                        required
                    />
                    <p
                        className={`relative mt-2 bottom-0 text-[red] ${
                            name && !validName ? "block" : "hidden"
                        }`}
                    >
                        3 to 21 characters.
                        <br /> Must begin with a letter. <br /> Cant contain
                        special characters
                    </p>
                    <p className="text-[red] mt-2">{notif}</p>
                    <button
                        className={`${
                            !validName
                                ? "bg-light-2 dark:bg-dark-3"
                                : "bg-green-1 text-dark-1"
                        }  mt-4 rounded-lg text-2xl p-2`}
                        disabled={!validName ? true : false}
                    >
                        Create Channel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateChannel;
