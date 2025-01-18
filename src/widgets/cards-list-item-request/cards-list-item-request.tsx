import {List} from "@mui/material";
import {CardListItemRequest, HelpRequests} from "@/features";

type Props = {
    data: HelpRequests
    favoriteHelps: string[]
}
export const CardsListItemRequest = ({data, favoriteHelps}: Props) => {
    return (
        <List  sx={{ display:"flex", flexDirection:"column", gap:"10px"}}>
            {data.map(c => (
                <CardListItemRequest key={c.id} id={c.id} isFavorite={favoriteHelps.includes(c.id)}
                                     requestGoal={c.requestGoal} descriptionHelpRequest={c.description}
                                     titleCard={c.title} location={c.location}
                                     contributorsCount={c.contributorsCount}
                                     requestGoalCurrentValue={c.requestGoalCurrentValue} dateClose={c.endingDate}
                                     organization={c.organization.title}/>
            ))}
        </List>
    );
};

