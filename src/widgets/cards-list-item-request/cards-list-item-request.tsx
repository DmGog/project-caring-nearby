import {List} from "@mui/material";
import {CardListItemRequest, HelpRequests} from "@/features";

type Props = {
    data: HelpRequests
}
export const CardsListItemRequest = ({data}: Props) => {
    return (
        <List>
            {data.map(c => (
                <CardListItemRequest key={c.id} requestGoal={c.requestGoal} descriptionHelpRequest={c.description}
                                     titleCard={c.title} location={c.location}
                                     contributorsCount={c.contributorsCount}
                                     requestGoalCurrentValue={c.requestGoalCurrentValue} dateClose={c.endingDate}
                                     organization={c.organization.title}/>
            ))}
        </List>
    );
};

