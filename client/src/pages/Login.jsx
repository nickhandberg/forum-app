import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const loginRef = useRef();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        loginRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { login: login, password: password };
        fetch(`${import.meta.env.VITE_API_BASE}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const navigate = useNavigate();

    function redirect(path) {
        navigate(path);
    }

    return (
        <section className="h-screen flex flex-col items-center justify-center px-4">
            <div className="bg-light-1 dark:bg-dark-2 p-8 rounded-lg max-w-[500px] w-full text-dark-1 dark:text-light-1">
                <h1 className="text-center text-4xl mb-8">Sign In</h1>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <label className="text-2xl" htmlFor="login">
                        {"Username or Email:"}
                    </label>
                    <input
                        className="bg-light-3 dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                        type="text"
                        id="login"
                        ref={loginRef}
                        autoComplete="off"
                        onChange={(e) => setLogin(e.target.value)}
                        value={login}
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
                            !login || !password
                                ? "bg-light-2 dark:bg-dark-3"
                                : "bg-green-2 text-dark-1"
                        }  mt-4 rounded-lg text-2xl p-2`}
                        disabled={!login || !password ? true : false}
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

export default Registration;
