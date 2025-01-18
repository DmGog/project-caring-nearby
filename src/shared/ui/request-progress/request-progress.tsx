import {Box, Button, LinearProgress, Typography} from "@mui/material";
import {formatNumber} from "@/shared";
import {MouseEvent} from "react";

type Props = {
    requestGoal: number;
    requestGoalCurrentValue: number;
    contributorsCount: number;
    onHelpClick: (e: MouseEvent) => void
    disabled: boolean
    marginBottom?: string
}

export const RequestProgress = ({
                                    requestGoal,
                                    requestGoalCurrentValue,
                                    contributorsCount,
                                    onHelpClick,
                                    disabled,
                                    marginBottom = "20px"
                                }: Props) => (
    <Box>
        <Typography variant="subtitle2" mb="4px">Мы собрали</Typography>
        <LinearProgress variant="determinate"
                        value={Math.min((requestGoalCurrentValue / requestGoal) * 100, 100)} sx={{mb: "4px"}}/>
        <Box display="flex" justifyContent="space-between" mb={marginBottom}>
            <Typography variant="body2" color="textSecondary">{formatNumber(requestGoalCurrentValue)} руб</Typography>
            <Typography variant="body2" color="textSecondary">{formatNumber(requestGoal)} руб</Typography>
        </Box>
        <Typography variant="body2" mb="10px" color="textSecondary">Нас
            уже: {formatNumber(contributorsCount)}</Typography>
        <Button disabled={disabled} onClick={onHelpClick} variant="contained" fullWidth>Помочь</Button>
    </Box>
);