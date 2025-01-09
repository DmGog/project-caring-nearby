import s from "./header.module.scss"
import LogoIcon from "@/shared/assets/icons/Logo.svg"
import {Link} from "react-router-dom";
import {PATH} from "@/app/router";
import {Button} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";


export const Header = () => {
    const isAuth = sessionStorage.getItem("auth")
    return (
        <div className={s.header}>
            <div className={s.container}>
                <Link to={PATH.PROFILE.PROFILE_PAGE_PERSONAL_DATA}>
                    <LogoIcon/>
                </Link>
                <Link to={"/#"} className={s.link}>
                    Запросы о помощи
                </Link>
                {!isAuth ? (
                    <Button size={"large"} color={"inherit"} variant={"outlined"} sx={{
                        display: "flex", justifyContent: "center", gap: "8px",
                        lineHeight: "normal", height: "42px",
                        width: "122px",
                    }} endIcon={<ChevronRight/>}>
                        ВОЙТИ
                    </Button>) : (
                    <div> кнопка</div>
                )}
            </div>
        </div>
    )
}


