import {FC} from "react";
import {Box, Button, Popover, Typography} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

type ProfilePopoverProps = {
    open: boolean;
    anchorEl: null | HTMLElement;
    onClose: () => void;
    onClickProfile: () => void;
    onClickExit: () => void;
}

export const PopoverProfile: FC<ProfilePopoverProps> = ({
                                                            open,
                                                            anchorEl,
                                                            onClose,
                                                            onClickProfile,
                                                            onClickExit,
                                                        }) => {
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "8px 16px"
            }}>
                <Button fullWidth onClick={onClickProfile}
                        sx={{
                            color: "black",
                            display: "flex",
                            alignItems: "center",
                            padding: "6px 0",
                            justifyContent: "flex-start"
                        }}>
                    <PersonRoundedIcon sx={{opacity: 0.56}}/>
                    <Typography sx={{marginLeft: "32px", textTransform: "none", opacity: 0.87}}>Мой профиль</Typography>
                </Button>
                <Button fullWidth onClick={onClickExit} sx={{
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "6px 0"
                }}>
                    <LogoutRoundedIcon sx={{opacity: 0.56}}/>
                    <Typography sx={{marginLeft: "32px", textTransform: "none", opacity: 0.87}}>Выйти</Typography>
                </Button>
            </Box>
        </Popover>
    );
};
