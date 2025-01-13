import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Divider,
    IconButton,
    LinearProgress,
    Typography
} from "@mui/material";
import CardFinanceImage from "@/shared/assets/images/card-finance.png";
import CardMaterialImage from "@/shared/assets/images/card-material.png";
import CardOrganizationImage from "@/shared/assets/images/card-organization.png";
import {StarBorder} from "@mui/icons-material";
import {formatDate, formatNumber, removeBrackets} from "@/shared";


type Props = {
    titleCard: string
    organization: string
    location: {
        district: string;
        city: string;
    }
    descriptionHelpRequest: string
    dateClose: string
    requesterType: "person" | "organization";
    helpType: "finance" | "material"
    contributorsCount: number;
    requestGoal: number;
    requestGoalCurrentValue: number;
}
export const CardRequest = ({
                                requesterType,
                                descriptionHelpRequest,
                                helpType,
                                requestGoal,
                                requestGoalCurrentValue,
                                titleCard,
                                dateClose,
                                contributorsCount,
                                organization,
                                location
                            }: Props) => {

    let cardImage;
    if (helpType === "finance" && requesterType === "person") {
        cardImage = CardFinanceImage;
    } else if (helpType === "material" && requesterType === "person") {
        cardImage = CardMaterialImage;
    }
    if (requesterType === "organization") {
        cardImage = CardOrganizationImage;
    }

    return (
        <Card sx={{
            width: "320px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
            "&:hover": {
                boxShadow: 6,
            },
        }}>
            <Box>
                <CardMedia component={"img"} src={cardImage} alt={"card image"} sx={{
                    width: "320px",
                    height: "220px",
                    objectFit: "cover",
                }}/>

                <Box width="100%" display="flex" alignItems="flex-start" padding="16px" minHeight="128px">
                    <Typography variant={"h5"}>
                        {removeBrackets(titleCard)}
                    </Typography>
                    <IconButton sx={{
                        marginLeft: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                        borderRadius: "4px",
                    }}><StarBorder/></IconButton>
                </Box>
            </Box>
            <Box>
                <Divider/>
                <CardContent sx={{
                    width: "100%",
                    padding: "10px 16px 20px"
                }}>
                    <Typography variant="subtitle2" mb="4px">Организатор</Typography>
                    <Typography variant="body2" mb="20px">{organization}</Typography>
                    <Typography variant="subtitle2" mb="4px">Локация</Typography>
                    <Typography variant="body2" mb="4px">Область: {location.district}</Typography>
                    <Typography variant="body2" mb="20px">Населенный пункт: {location.city}</Typography>
                    <Typography variant="subtitle2" mb="4px">Цель сбора</Typography>
                    <Typography variant="body2" sx={{
                        mb: "20px",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}>{descriptionHelpRequest}</Typography>
                    <Typography variant="subtitle2" mb="4px">Завершение</Typography>
                    <Typography variant="body2" mb="20px">{formatDate(dateClose)}</Typography>
                    <Typography variant="subtitle2" mb="4px">Мы собрали</Typography>
                    <LinearProgress variant="determinate"
                                    value={Math.min((requestGoalCurrentValue / requestGoal) * 100, 100)} sx={{
                        mb: "4px"
                    }}/>
                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%"
                         mb="20px">
                        <Typography variant="body2" color="textSecondary">{formatNumber(requestGoalCurrentValue)} руб</Typography>
                        <Typography variant="body2" color="textSecondary">{formatNumber(requestGoal)} руб</Typography>
                    </Box>
                    <Typography variant="body2" mb="10px" color="textSecondary">Нас уже: {formatNumber(contributorsCount)}</Typography>
                    <Button size="large" color="primary" variant="contained" fullWidth>Помочь</Button>
                </CardContent>
            </Box>
        </Card>
    );
};

