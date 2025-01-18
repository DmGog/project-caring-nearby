import LogoIcon from "@/shared/assets/icons/Logo.svg"
import {Link} from "react-router-dom";
import {PATH} from "@/app/router";
import {AppBar, Box, Button, styled, Toolbar} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";
import {PopoverProfile, useLogout} from "@/shared";
import {MouseEvent, useState} from "react";
import {useNavigate} from "react-router";
import AvatarIcon from "@/shared/assets/icons/avatar.svg"

export const Header = () => {
    const isAuth = localStorage.getItem("auth")
    const logout = useLogout();
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
        logout()
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
                <Link to={isAuth ? PATH.HELPS_PAGE : "#"} onClick={(e) => !isAuth && e.preventDefault()}>
                    <LogoIcon/>
                </Link>
                <Box display="flex" width="100%" maxWidth="824px" alignItems="center" justifyContent="space-between">
                    <StyledLink to={isAuth ? PATH.HELPS_PAGE : "#"} onClick={(e) => !isAuth && e.preventDefault()}>
                        Запросы о помощи
                    </StyledLink>
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

const StyledLink = styled(Link)`
    cursor: pointer;
    color: inherit;
    text-decoration: none;

    &:hover {
        color: #1976d2;
    }
`;