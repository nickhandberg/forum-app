import React, { useContext, useEffect, useRef, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../hooks/context/ContextProvider";
import useAppContext from "../hooks/useAppContext";

import axios from "../utils/axios";

const Login = () => {
    const { setAuth } = useAppContext();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const usernameRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { username: username, password: password };
        try {
            const response = await axios.post(
                "/auth/login",
                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            const accessToken = response?.data?.accessToken;
            setAuth({ username, password, accessToken });
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                console.log("No server response");
            } else if (err.response?.status === 400) {
                console.log("Missing username or password");
            } else if (err.response?.status === 401) {
                console.log("Unauthorized");
            } else {
                console.log("Login failed");
            }
        }
    };

    function redirect(path) {
        navigate(path);
    }

    return (
        <section className="h-screen flex flex-col items-center justify-center px-4">
            <div className="bg-light-1 dark:bg-dark-2 p-8 rounded-lg max-w-[500px] w-full text-dark-1 dark:text-light-1">
                <h1 className="text-center text-4xl mb-8">Sign In</h1>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <label className="text-2xl" htmlFor="username">
                        {"Username:"}
                    </label>
                    <input
                        className="bg-light-3 dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                        type="text"
                        id="username"
                        ref={usernameRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                    <label className="text-2xl" htmlFor="password">
                        {"Password:"}
                    </label>
                    <input
                        className="bg-light-3 dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                        type="password"
                        id="password"
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />

                    <button
                        className={`${
                            !username || !password
                                ? "bg-light-2 dark:bg-dark-3"
                                : "bg-green-2 text-dark-1"
                        }  mt-4 rounded-lg text-2xl p-2`}
                        disabled={!username || !password ? true : false}
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-8 ">
                    Dont have an account?
                    <br />
                    <span className="line text-green-2">
                        <p
                            className="cursor-pointer"
                            onClick={() => redirect("/register")}
                        >
                            Sign up
                        </p>
                    </span>
                </p>
            </div>
        </section>
    );
};

export default Login;
