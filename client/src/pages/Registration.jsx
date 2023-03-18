import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,17}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Registration = () => {
    const emailRef = useRef();

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);

    const [success, setSuccess] = useState(false);
    const [notif, setNotif] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { email: email, username: user, password: pwd };
        try {
            const response = await axios.post(
                "/auth/register",
                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                console.log(err.response);
                setNotif("Registration failed");
            } else if (err.response?.status === 409) {
                setNotif("Username or email already in use");
            } else {
                setNotif("Registration failed");
            }
        }
    };

    function redirect(path) {
        navigate(path);
    }

    return (
        <section className="h-screen flex flex-col items-center justify-center px-4">
            <div className="bg-light-1 dark:bg-dark-2 p-8 rounded-lg max-w-[500px] w-full text-dark-1 dark:text-light-1">
                {success ? (
                    <div>
                        <h1 className="text-4xl text-center">Success</h1>
                        <p className="mt-2 text-center ">
                            You have successfully registered an account.
                        </p>
                        <p
                            onClick={() => redirect("/login")}
                            className="text-green-1 text-center mt-8 text-2xl cursor-pointer"
                        >
                            Sign In
                        </p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-center text-4xl mb-8">Sign Up</h1>
                        <form
                            className="flex flex-col gap-2"
                            onSubmit={handleSubmit}
                        >
                            <label className="text-2xl" htmlFor="email">
                                Email:
                            </label>
                            <input
                                className="bg-light-3 dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                                type="text"
                                id="email"
                                ref={emailRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                            <p
                                className={`relative mt-2 bottom-0 text-[red] ${
                                    email && !validEmail ? "block" : "hidden"
                                }`}
                            >
                                Must be valid email address.
                            </p>

                            <label className="text-2xl" htmlFor="username">
                                Username:
                            </label>
                            <input
                                className="bg-light-3 dark:bg-dark-3 rounded-md text-3xl px-2 py-[2px]"
                                type="text"
                                id="username"
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                            <p
                                className={`relative mt-2 bottom-0 text-[red] ${
                                    user && !validName ? "block" : "hidden"
                                }`}
                            >
                                4 to 18 characters.
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
                            />
                            <p
                                className={`relative mt-2 bottom-0  text-[red] ${
                                    pwd && !validPwd ? "block" : "hidden"
                                }`}
                            >
                                8 to 24 characters.
                                <br />
                                Must include uppercase and lowercase letters, a
                                number and a special character ! @ # $ %.
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
                            />
                            <p
                                id="confirmnote"
                                className={`relative mt-2 bottom-0 text-[red] ${
                                    !validMatch ? "block" : "hidden"
                                }`}
                            >
                                Must match the first password input field.
                            </p>

                            <p className="text-[red] mt-2">{notif}</p>

                            <button
                                className={`${
                                    !validName ||
                                    !validPwd ||
                                    !validMatch ||
                                    !validEmail
                                        ? "bg-light-2 dark:bg-dark-3"
                                        : "bg-green-1 text-dark-1"
                                }  mt-4 rounded-lg text-2xl p-2`}
                                disabled={
                                    !validName ||
                                    !validPwd ||
                                    !validMatch ||
                                    !validEmail
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
                            <span
                                onClick={() => redirect("/login")}
                                className="line text-green-1 cursor-pointer"
                            >
                                Sign In
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Registration;
