import {CardRequest, HelpRequests} from "@/features";
import {Box} from "@mui/material";


type Props = {
    data: HelpRequests
    favoriteHelps: string[]
}
export const CardsRequest = ({data, favoriteHelps}: Props) => {
        return (
            <Box display="flex" width="100%" gap="24px">
                {
                    data.map(c => (
                        <CardRequest key={c.id} isFavorite={favoriteHelps.includes(c.id)} id={c.id}
                                     requesterType={c.requesterType} titleCard={c.title} location={c.location}
                                     contributorsCount={c.contributorsCount} requestGoal={c.requestGoal}
                                     descriptionHelpRequest={c.description} helpType={c.helpType} dateClose={c.endingDate}
                                     requestGoalCurrentValue={c.requestGoalCurrentValue}
                                     organization={c.organization.title}/>
                    ))
                }
            </Box>
        );
    }
;

