import ErrorImage from "@/shared/assets/images/not-found.png"
import {Box, Typography} from "@mui/material";

export const NotFoundPage = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
        }}>
            <img src={ErrorImage} alt={"Error 404"}/>
            <Typography fontSize="80px" variant="subtitle2">404</Typography>
            <Typography fontSize="34px" variant="subtitle2">Страница не найдена</Typography>
        </Box>
    );
};

