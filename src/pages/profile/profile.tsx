import s from "./profile.module.scss"
import ProfileDefaultImage from "@/shared/assets/images/profile-default.png"
import {Outlet, useNavigate} from "react-router";
import {useUserProfileQuery} from "@/features";
import {Box, Button, CardContent, CardMedia, Typography} from "@mui/material";
import {PATH} from "@/app/router";


export const Profile = () => {
    const {data} = useUserProfileQuery()
    const navigate = useNavigate();
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
            <CardMedia component={"img"} src={ProfileDefaultImage} alt={"profile image"} sx={{
                width: "321px",
                height: "240px",
                objectFit: "cover",
                borderRadius: "4px 4px 0 0",
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
            <Outlet/>
        </div>
    );
};

