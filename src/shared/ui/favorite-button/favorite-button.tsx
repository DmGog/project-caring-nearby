import {Button, IconButton} from "@mui/material";
import {Star, StarBorder} from "@mui/icons-material";
import {MouseEvent} from "react";

type Props = {
    isFavorite: boolean;
    onClick: (e: MouseEvent) => void;
    disabled?: boolean;
    titleButton?: boolean;
}

export const FavoriteButton = ({isFavorite, onClick, titleButton = false, disabled = false}: Props) => {
    const buttonStyles = {
        height: "28px",
        textTransform: "none",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        padding: "4px 10px",
    };

    const iconStyles = {
        marginLeft: "10px",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: "4px",
    };

    const buttonContent = isFavorite ? "Удалить из избранное" : "Добавить в избранное";
    const icon = isFavorite ? <Star/> : <StarBorder/>;

    return titleButton ? (
        <Button
            onClick={onClick}
            size="small"
            color="inherit"
            variant="outlined"
            startIcon={icon}
            sx={buttonStyles}
            disabled={disabled}
        >
            {buttonContent}
        </Button>
    ) : (
        <IconButton
            onClick={onClick}
            sx={iconStyles}
            disabled={disabled}
        >
            {icon}
        </IconButton>
    );
};
