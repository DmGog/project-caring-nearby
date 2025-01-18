import {Accounts, LoginForm} from "@/features";
import {Box} from "@mui/material";

export const LoginPage = () => {
    return (
        <Box display="flex" width="100%">
            <LoginForm/>
            <Accounts/>
        </Box>
    );
};

