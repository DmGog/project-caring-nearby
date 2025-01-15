import {Help} from "@/features";
import {Box, Typography} from "@mui/material";

export const Request = () => {
    return (
        <Box sx={{
            minWidth: "1500px", width: "100%", boxShadow: "0 0 0 1px #e0e0e0",
            background: "#f5f5f5", padding: "30px 40px 64px"
        }}>
            <Typography variant="h4" mb="30px">Запрос о помощи</Typography>
            <Help/>
        </Box>
    );
};

