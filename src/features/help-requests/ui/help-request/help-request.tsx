import {useHelpRequest, useHelpRequestByIdQuery, useUserHelpFavoritesRequestsQuery} from "@/features";
import {Box, Button, Card, CardContent, LinearProgress, List, ListItem, Paper, Typography} from "@mui/material";
import {CheckCircleOutlined, ErrorOutline, Star, StarBorder, VerifiedRounded} from "@mui/icons-material";
import {formatDate, formatNumber, InfoRow, NotFoundResult, removeBrackets} from "@/shared";
import {useParams} from "react-router";
import {HelpPageSkeleton} from "../help-page-skeleton";

export const Help = () => {
    const {id} = useParams()
    const {data: helpRequest, isLoading: isLoadingHelpRequest} = useHelpRequestByIdQuery(id ?? "");
    const {data: userFavoriteHelps, isLoading: isLoadingFavoriteHelps} = useUserHelpFavoritesRequestsQuery();
    const {handleAddContribute, handleAddFavorite, handleRemoveFavorite} = useHelpRequest()

    if (isLoadingHelpRequest || isLoadingFavoriteHelps) {
        return <HelpPageSkeleton/>
    }

    if (!helpRequest) {
        return <NotFoundResult img={"infoNotImage"} title={"Ошибка! Не удалось загрузить информацию"} color={"red"}/>
    }
    let isFavorite = false
    if (userFavoriteHelps && id) {
        isFavorite = userFavoriteHelps.includes(id)
    }
    return (
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
            <Paper variant="outlined" elevation={0} sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                borderRadius: "4px",
                maxWidth: "1080px",
                width: "100%",
                boxShadow: "0 0 0 1px #e0e0e0",
                background: "#fff",
                padding: "40px 36px 64px"
            }}>
                <Box maxWidth="550px" width="100%" display="flex" flexDirection="column" alignItems="flex-start">
                    <Typography variant="h5" mb="30px">{removeBrackets(helpRequest.title)}</Typography>
                    <Typography variant="h6" mb="10px">Организация</Typography>
                    <Typography variant="body2" mb="4px">{helpRequest.organization.title}</Typography>
                    <Box display="flex" justifyContent="flex-start" alignItems="end" gap="4px" mb="30px">
                        {helpRequest.organization.isVerified ?
                            (
                                <>
                                    <VerifiedRounded sx={{color: "#1E88E5",}}/>
                                    <Typography variant="caption">Организация проверена</Typography>
                                </>
                            )
                            :
                            (
                                <>
                                    <ErrorOutline sx={{color: "red"}}/>
                                    <Typography variant="caption" color="red">Организация не проверена</Typography>
                                </>
                            )
                        }
                    </Box>
                    <Typography variant="h6" mb="10px">Кому мы помогаем</Typography>
                    <Typography variant="body2" mb="30px">
                        {helpRequest.description}
                    </Typography>
                    <Typography variant="h6" mb="10px">Цель сбора</Typography>
                    <Typography variant="body2" mb="30px">
                        {helpRequest.goalDescription}
                    </Typography>
                    <Typography variant="h6" mb="10px">План действий</Typography>
                    <List sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        p: 0,
                        mb: "30px"
                    }}>
                        {helpRequest.actionsSchedule.map((item, index) => (
                            <ListItem key={index}
                                      sx={{display: "flex", alignItems: "end", gap: "4px", p: "0"}}>
                                {item.isDone ? <CheckCircleOutlined sx={{
                                    color: "#4caf50",
                                }}/> : <CheckCircleOutlined sx={{
                                    opacity: "0.5",
                                }}/>}
                                <Typography variant="body2">{item.stepLabel}</Typography>
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h6" mb="10px">Завершение</Typography>
                    <Typography variant="body2" mb="30px">{formatDate(helpRequest.endingDate)}</Typography>
                    <Typography variant="h6" mb="10px">Локация</Typography>
                    <InfoRow label="Область" value={helpRequest.location.district}/>
                    <InfoRow label="Населенный пункт" value={helpRequest.location.city}/>
                    <Typography variant="h6" mt="30px" mb="10px">Контакты</Typography>
                    <Box display="flex" width="100%" alignItems="center" justifyContent="space-between">
                        <Box>
                            <Typography variant="subtitle2" mb="4px">Телефон</Typography>
                            <Typography variant="body2">{helpRequest.contacts.phone}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" mb="4px">E-mail</Typography>
                            <Typography variant="body2">{helpRequest.contacts.email}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" mb="4px">Сайт</Typography>
                            <Typography variant="body2">{helpRequest.contacts.website}</Typography>
                        </Box>
                    </Box>

                </Box>
                <Button onClick={(e) => {
                    e.stopPropagation();
                    (isFavorite ? handleRemoveFavorite(helpRequest.id) : handleAddFavorite(helpRequest.id))
                }} size="small"
                        color="inherit"
                        variant="outlined" startIcon={isFavorite ? <Star/> : <StarBorder/>}
                        sx={{
                            height: "28px",
                            textTransform: "none",
                            border: "1px solid rgba(0, 0, 0, 0.12)",
                            padding: "4px 10px",
                        }}>
                    {isFavorite ? "Удалить из избранное" : "Добавить в избранное"}
                </Button>
            </Paper>
            <Card sx={{
                width: "320px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
                borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "0 0 4px 4px",
            }}>
                <CardContent sx={{
                    padding: "20px 20px 30px",
                }}>
                    <Typography variant="h6" mb="10px">Вместе для добрых дел</Typography>
                    <Typography variant="subtitle2" mb="4px">Цель сбора</Typography>
                    <Typography variant="body2" mb="20px">
                        {helpRequest.goalDescription}
                    </Typography>
                    <Typography variant="subtitle2" mb="4px">Завершение</Typography>
                    <Typography variant="body2" mb="20px">{formatDate(helpRequest.endingDate)}</Typography>
                    <Box display="flex" flexDirection="column" width="100%">
                        <Typography variant="subtitle2" mb="4px">
                            Мы собрали
                        </Typography>
                        <LinearProgress sx={{
                            mb: "4px"
                        }} variant="determinate"
                                        value={Math.min((helpRequest.requestGoalCurrentValue / helpRequest.requestGoal) * 100, 100)}/>
                        <Box display="flex" justifyContent="space-between" mb="40px">
                            <Typography variant="body2" color="textSecondary">
                                {formatNumber(helpRequest.requestGoalCurrentValue)} руб
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {formatNumber(helpRequest.requestGoal)} руб
                            </Typography>
                        </Box>
                        <Typography variant="body2" mb="10px" color="textSecondary">Нас
                            уже: {formatNumber(helpRequest.contributorsCount)}</Typography>
                        <Button variant="contained" fullWidth
                                onClick={() => handleAddContribute(helpRequest.id)}>Помочь</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

