import {useNavigate} from "react-router";
import {useEffect} from "react";
import {PATH} from "@/app/router";


export const AuthRedirect = () => {
    const navigate = useNavigate();
    const isAuth = sessionStorage.getItem("auth");

    useEffect(() => {
        if (!isAuth) {
            navigate(PATH.LOGIN_PAGE);
        } else {
            navigate(PATH.PROFILE.PROFILE_PAGE_PERSONAL_DATA)
        }
    }, [isAuth]);

    return null;
};