import {Box, Card, CardContent, CardMedia, Divider, Typography} from "@mui/material";
import CardFinanceImage from "@/shared/assets/images/card-finance.png";
import CardMaterialImage from "@/shared/assets/images/card-material.png";
import CardOrganizationImage from "@/shared/assets/images/card-organization.png";
import {FavoriteButton, formatDate, removeBrackets, RequestProgress} from "@/shared";
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
    requesterType: "person" | "organization";
    helpType: "finance" | "material"
    contributorsCount: number;
    requestGoal: number;
    requestGoalCurrentValue: number;
    isFavorite: boolean;
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
                                location,
                                id, isFavorite
                            }: Props) => {

    const {
        handleFavoriteClick,
        isDisabled,
        handleHelpClick,
        handleNavigateRequestHelp,
    } = useHelpRequest(isFavorite)

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
        <Card onClick={() => handleNavigateRequestHelp(id)} sx={{
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
                    <FavoriteButton isFavorite={isFavorite} onClick={handleFavoriteClick(id)} disabled={isDisabled}/>
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
                    <RequestProgress requestGoal={requestGoal} requestGoalCurrentValue={requestGoalCurrentValue}
                                     contributorsCount={contributorsCount} onHelpClick={handleHelpClick(id)}
                                     disabled={isDisabled}/>
                </CardContent>
            </Box>
        </Card>
    );
};

