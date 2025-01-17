import {PATH} from "@/app/router";
import {Navigate, Outlet} from "react-router";


type Props = {
    redirectPath?: string;
}

export const ProtectedRoute = ({redirectPath = PATH.LOGIN_PAGE}: Props) => {
    const isAuth = localStorage.getItem("auth");

    if (!isAuth) {
        return <Navigate to={redirectPath} replace/>;
    }

    return <Outlet/>;
};