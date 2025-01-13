import s from "./header.module.scss"
import LogoIcon from "@/shared/assets/icons/Logo.svg"
import {Link} from "react-router-dom";
import {PATH} from "@/app/router";
import {AppBar, Box, Button, Toolbar} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";
import {PopoverProfile} from "@/shared";
import {useState, MouseEvent} from "react";
import {useNavigate} from "react-router";
import AvatarIcon from "@/shared/assets/icons/avatar.svg"


export const Header = () => {
    const isAuth = sessionStorage.getItem("auth")
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const handleClickAvatar = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const handleClickProfile = () => {
        navigate(PATH.PROFILE.PROFILE_PAGE_PERSONAL_DATA);
        handleClosePopover();
    }

    const handleClickExit = () => {
        sessionStorage.clear()
        navigate(PATH.LOGIN_PAGE);
        handleClosePopover();
    }
    return (
        <AppBar color="inherit" variant="elevation" elevation={2} square sx={{
            height: "84px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Toolbar variant="regular" sx={{
                display: "flex",
                width: "100%",
                maxWidth: "1548px",
                justifyContent: "space-between"
            }}>
                <Link to={PATH.HELP}>
                    <LogoIcon/>
                </Link>
                <Box display="flex" width="100%" maxWidth="824px" alignItems="center" justifyContent="space-between">
                    <Link to={PATH.HELP} className={s.link}>
                        Запросы о помощи
                    </Link>
                    {!isAuth ? (
                        <Button size={"large"} color={"inherit"} variant={"outlined"} sx={{
                            display: "flex", justifyContent: "center", gap: "8px",
                            lineHeight: "normal", height: "42px",
                            width: "122px",
                        }} endIcon={<ChevronRight/>} onClick={() => {
                            navigate(PATH.LOGIN_PAGE)
                        }}>
                            ВОЙТИ
                        </Button>) : (
                        <Box display="flex" justifyContent="flex-end">
                            <Button onClick={handleClickAvatar} sx={{
                                borderRadius: "50%",
                            }}>
                                <AvatarIcon/>
                            </Button>
                            <PopoverProfile open={open} anchorEl={anchorEl}
                                            onClose={handleClosePopover}
                                            onClickProfile={handleClickProfile}
                                            onClickExit={handleClickExit}/>
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}


