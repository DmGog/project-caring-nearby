import {useNavigate} from "react-router";
import {useEffect} from "react";
import {PATH} from "@/app/router";


export const AuthRedirect = () => {
    const navigate = useNavigate();
    const isAuth = localStorage.getItem("auth");

    useEffect(() => {
        if (!isAuth) {
            navigate(PATH.LOGIN_PAGE);
        }
    }, [isAuth, navigate]);

    return null;
};