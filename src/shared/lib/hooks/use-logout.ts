import {useNavigate} from "react-router";
import {baseApi} from "@/app";
import {PATH} from "@/app/router";

export const useLogout = () => {
    const navigate = useNavigate();

    return () => {
        localStorage.clear();
        baseApi.util.resetApiState();
        navigate(PATH.LOGIN_PAGE);
    };
};