import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Registration = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("");

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { email: email, username: user, password: pwd };
        fetch(`${import.meta.env.VITE_API_BASE}/auth/register`, {
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
                <p ref={errRef} className={errMsg ? "block" : "hidden"}>
                    {errMsg}
                </p>
                <h1 className="text-center text-4xl mb-8">Sign Up</h1>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <label className="text-2xl" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className="bg-light-3 dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                        type="text"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <label className="text-2xl" htmlFor="username">
                        Username:
                    </label>
                    <input
                        className="bg-light-3 dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p
                        className={`relative mt-2 bottom-0 text-xs p-2 text-[red] rounded-md bg-light-2 dark:bg-dark-3 ${
                            userFocus && user && !validName ? "block" : "hidden"
                        }`}
                    >
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                    </p>

                    <label className="text-2xl" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="bg-light-3 dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p
                        className={`relative mt-2 bottom-0 text-xs p-2 text-[red] rounded-md bg-light-2 dark:bg-dark-3 ${
                            pwdFocus && pwd && !validPwd ? "block" : "hidden"
                        }`}
                    >
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number
                        and a special character ! @ # $ %.
                    </p>

                    <label className="text-2xl" htmlFor="confirm_pwd">
                        Confirm Password:
                    </label>
                    <input
                        className="bg-light-3 dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p
                        id="confirmnote"
                        className={`relative mt-2 bottom-0 text-xs p-2 text-[red] rounded-md bg-light-2 dark:bg-dark-3 ${
                            matchFocus && !validMatch ? "block" : "hidden"
                        }`}
                    >
                        Must match the first password input field.
                    </p>

                    <button
                        className={`${
                            !validName || !validPwd || !validMatch
                                ? "bg-light-2 dark:bg-dark-3"
                                : "bg-green-2 text-dark-1"
                        }  mt-4 rounded-lg text-2xl p-2`}
                        disabled={
                            !validName || !validPwd || !validMatch
                                ? true
                                : false
                        }
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-8 ">
                    Already registered?
                    <br />
                    <span className="line text-green-2">
                        <p
                            className="cursor-pointer"
                            onClick={() => redirect("/login")}
                        >
                            Sign In
                        </p>
                    </span>
                </p>
            </div>
        </section>
    );
};

export default Registration;
