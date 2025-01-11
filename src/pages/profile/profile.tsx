import s from "./profile.module.scss"
import ProfileDefaultImage from "@/shared/assets/images/profile-default.png"
import {Outlet, useLocation, useNavigate} from "react-router";
import {useUserProfileQuery} from "@/features";
import {Box, Button, CardContent, CardMedia, Paper, Typography} from "@mui/material";
import {PATH} from "@/app/router";
import {TabsComponent, ToggleButtonsGroup} from "@/shared";


export const Profile = () => {
    const {data} = useUserProfileQuery()
    const navigate = useNavigate();
    const {pathname} = useLocation()
    const handleLogOut = () => {
        sessionStorage.clear()
        navigate(PATH.LOGIN_PAGE);
    }
    if (!data) return null;
    return (
        <div className={s.profile}>
            <Typography variant={"h4"} sx={{
                marginBottom: "20px"
            }}>Мой профиль</Typography>
            <Box display={"flex"} gap={"20px"}>
                <Box>
                    <CardMedia component={"img"} src={ProfileDefaultImage} alt={"profile image"} sx={{
                        width: "320px",
                        height: "240px",
                        objectFit: "cover",
                        borderRadius: "4px 4px 0 0",
                        backgroundColor:"#fff",
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                    }}/>
                    <CardContent sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: "320px",
                        padding: "20px",
                        background: "#fff",
                        borderRadius: "border-radius: 0 0 4px 4px;",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
                        borderRight: "1px solid rgba(0, 0, 0, 0.12)",

                    }}>
                        <Typography variant={"h6"} sx={{marginBottom: "10px"}}>
                            {data.name} {data.lastName}
                        </Typography>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            marginBottom: "50px"
                        }}>
                            <Typography variant={"subtitle2"}>
                                Статус:
                            </Typography>
                            <Typography variant={"body2"}>{data.status}</Typography>
                        </Box>
                        <Button size={"large"} color={"inherit"} variant={"outlined"} fullWidth
                                onClick={handleLogOut}>ВЫЙТИ ИЗ АККАУНТА</Button>
                    </CardContent>
                </Box>
                <Paper variant={"outlined"} elevation={0}
                       sx={{
                           width: "100%",
                           borderRadius: "4px",
                           padding: "10px 36px 40px",
                       }}>
                    <Box display={"flex"}>
                        <TabsComponent/>
                        {pathname === PATH.PROFILE.PROFILE_PAGE_FAVORITES && <ToggleButtonsGroup/>}
                    </Box>
                    <Outlet/>
                </Paper>
            </Box>
        </div>
    );
};

