import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../hooks/context/ContextProvider";
import axios from "../utils/axios";

const Logout = () => {
    const { setAuth } = useContext(AppContext);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("/auth/logout").then(function (response) {
            setAuth({});
            navigate("/");
        });
    }, []);

    return (
        <div>
            <h1 className="pt-[100px] text-3xl">Logging out</h1>
        </div>
    );
};

export default Logout;
