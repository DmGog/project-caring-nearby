import {Outlet} from "react-router";
import {CardUser, ProfilePageSkeleton, useUserProfileQuery} from "@/features";
import {Box, Paper, Typography} from "@mui/material";
import {NotFoundResult, TabsComponent} from "@/shared";

export const Profile = () => {
    const {data, isLoading} = useUserProfileQuery()

    return (
        <Box sx={{
            width: "100%",
            padding: "30px 40px 54px",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 0 0 1px #e0e0e0"
        }}>
            {isLoading ? <ProfilePageSkeleton/> :
                <>
                    {!data ? <NotFoundResult img="infoNotImage" title="Ошибка! Не удалось загрузить информацию"
                                             color="red"/> : (
                        <>
                            <Typography variant="h4" mb="20px">Мой профиль</Typography>
                            <Box display="flex" gap="20px">
                                <CardUser name={data.name} lastName={data.lastName} status={data.status}/>
                                <Paper variant="outlined" elevation={0} sx={{
                                    width: "100%",
                                    minHeight: "982px",
                                    borderRadius: "4px",
                                    padding: "10px 36px 40px",
                                }}>
                                    <TabsComponent/>
                                    <Outlet context={{data}}/>
                                </Paper>
                            </Box>
                        </>
                    )}
                </>

            }
        </Box>
    );
};
