import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";

export default function PrivateRoute() {
    const [ok, setOK] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('/api/v1/auth/user-auth',
                // {
                //     headers:{
                //         "Authorization": auth?.token
                //     }
                // }
            )
            if (res.data.ok) {
                setOK(true)
            } else {
                setOK(false)
            }
        }
        if (auth?.token) authCheck()
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner path=""/>
}