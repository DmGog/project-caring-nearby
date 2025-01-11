import {useState, MouseEvent} from "react";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {GridOnRounded, ListAltRounded, LocationOn} from "@mui/icons-material";

export const ToggleButtonsGroup = () => {
    const [alignment, setAlignment] = useState<string | null>("left");

    const handleAlignment = (
        _: MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
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