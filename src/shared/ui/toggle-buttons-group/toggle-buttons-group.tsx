import {MouseEvent} from "react";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {GridOnRounded, ListAltRounded, LocationOn} from "@mui/icons-material";

export type AlignmentType = "left" | "center" | "right"
type Props = {
    alignment: AlignmentType
    onAlignmentChange: (newAlignment: AlignmentType) => void;
}

export const ToggleButtonsGroup = ({alignment = "left", onAlignmentChange}: Props) => {
    const handleAlignment = (
        _: MouseEvent<HTMLElement>,
        newAlignment: AlignmentType,
    ) => {
        onAlignmentChange(newAlignment);
    };

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{
                width: "120px",
                height: "40px",
            }}
        >
            <ToggleButton size={"small"} value="left" aria-label="grid">
                <GridOnRounded/>
            </ToggleButton>
            <ToggleButton size={"small"} value="center" aria-label="list">
                <ListAltRounded/>
            </ToggleButton>
            <ToggleButton size={"small"} value="right" aria-label="right aligned">
                <LocationOn/>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}