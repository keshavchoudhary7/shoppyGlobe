import React from 'react'
import { useState, useEffect } from "react";
import { useAuth } from "../../context/ContextAuth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/admin-auth`);
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner/>;

}

