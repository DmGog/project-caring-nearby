import s from "./profile.module.scss"
import ProfileDefaultImage from "@/shared/assets/images/profile-default.png"
import {Outlet, useNavigate} from "react-router";
import {useUserProfileQuery} from "@/features";
import {Box, Button, CardContent, CardMedia, Paper, Typography} from "@mui/material";
import {PATH} from "@/app/router";
import {NotFoundResult, TabsComponent} from "@/shared";
import {baseApi} from "@/app";


export const Profile = () => {
    const {data} = useUserProfileQuery()
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.clear()
        baseApi.util.resetApiState()
        navigate(PATH.LOGIN_PAGE);
    }
    return (
        <div className={s.profile}>
            {!data ?
                <NotFoundResult img={"infoNotImage"}
                                title={"Ошибка! Не удалось загрузить информацию"}
                                color={"red"}/>
                :
                (<> <Typography variant={"h4"} sx={{
                        marginBottom: "20px"
                    }}>Мой профиль</Typography>
                        <Box display={"flex"} gap={"20px"}>
                            <Box>
                                <CardMedia component={"img"} src={ProfileDefaultImage} alt={"profile image"} sx={{
                                    width: "320px",
                                    height: "240px",
                                    objectFit: "cover",
                                    borderRadius: "4px 4px 0 0",
                                    backgroundColor: "#fff",
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
                                       minHeight: "982px",
                                       borderRadius: "4px",
                                       padding: "10px 36px 40px",
                                   }}>
                                <TabsComponent/>
                                <Outlet/>
                            </Paper>
                        </Box>
                    </>
                )}
        </div>
    );
};

