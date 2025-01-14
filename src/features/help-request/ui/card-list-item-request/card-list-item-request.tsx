import {Box, Button, LinearProgress, ListItem, Stack, Typography} from "@mui/material";
import {formatDate, formatNumber, removeBrackets} from "@/shared";
import {Star, StarBorder} from "@mui/icons-material";
import {useHelpRequest} from "@/features";


type Props = {
    id: string
    titleCard: string
    organization: string
    location: {
        district: string;
        city: string;
    }
    descriptionHelpRequest: string
    dateClose: string
    contributorsCount: number;
    requestGoal: number;
    requestGoalCurrentValue: number;
    isFavorite: boolean;
}

export const CardListItemRequest = ({
                                        descriptionHelpRequest,
                                        requestGoal,
                                        requestGoalCurrentValue,
                                        titleCard,
                                        dateClose,
                                        contributorsCount,
                                        organization,
                                        location,
                                        isFavorite,
                                        id
                                    }: Props) => {
    const {handleRemoveFavorite, handleAddFavorite, handleAddContribute} = useHelpRequest()
    return (
        <ListItem sx={{
            width: "1008px",
            padding: "20px",
            borderBottom: "1px solid #0000001F",
            cursor: "pointer",
            transition: "box-shadow 0.3s ease",
            "&:hover": {
                boxShadow: 6,
            },
        }}>
            <Stack direction="row" justifyContent="space-between">
                <Stack sx={{width: "25%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <Typography variant="h5" mb="30px">
                        {removeBrackets(titleCard)}
                    </Typography>
                    <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
                        <Typography variant="subtitle2" mb="4px">
                            Мы собрали
                        </Typography>
                        <LinearProgress sx={{
                            mb: "4px"
                        }} variant="determinate"
                                        value={Math.min((requestGoalCurrentValue / requestGoal) * 100, 100)}/>
                        <Box sx={{display: "flex", justifyContent: "space-between", mb: "20px"}}>
                            <Typography variant="body2" color="textSecondary">
                                {formatNumber(requestGoalCurrentValue)} руб
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {formatNumber(requestGoal)} руб
                            </Typography>
                        </Box>
                        <Typography variant="body2" mb="10px" color="textSecondary">Нас
                            уже: {formatNumber(contributorsCount)}</Typography>
                        <Button onClick={() => handleAddContribute(id)} variant="contained" fullWidth>Помочь</Button>
                    </Box>
                </Stack>

                <Stack gap="30px" sx={{width: "25%"}}>
                    <Box>
                        <Typography variant="subtitle2">
                            Организатор
                        </Typography>
                        <Typography variant="body2">
                            {organization}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">
                            Завершение
                        </Typography>
                        <Typography variant="body2">
                            {formatDate(dateClose)}
                        </Typography>
                    </Box>
                </Stack>

                <Stack gap="30px" sx={{width: "25%"}}>
                    <Box>
                        <Typography variant="subtitle2">
                            Локация
                        </Typography>
                        <Typography variant="body2">
                            Область: {location.district}
                        </Typography>
                        <Typography variant="body2">
                            Город: {location.city}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">
                            Цель сбора
                        </Typography>
                        <Typography variant="body2">
                            {descriptionHelpRequest}
                        </Typography>
                    </Box>
                </Stack>
                <Button onClick={() => (isFavorite ? handleRemoveFavorite(id) : handleAddFavorite(id))} size="small"
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
            </Stack>
        </ListItem>
    );
};

