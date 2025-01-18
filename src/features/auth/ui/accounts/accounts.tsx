import {testData} from "./accounts-data";
import {Alert, AlertTitle, Box, List, ListItem, Paper, Typography} from "@mui/material";

export const Accounts = () => {
    return (
        <Paper variant="outlined" elevation={0} square sx={{width: "100%", padding: "64px 40px",}}>
            <Typography variant="h4" mb="90px">Тестовые профили</Typography>
            <List sx={{p: "0px"}}>
                {testData.map(profile => {
                    return (
                        <ListItem key={profile.id} dense disableGutters>
                            <Alert variant="outlined" severity="info">
                                <AlertTitle>{profile.name}</AlertTitle>
                                <Box display="flex" flexDirection="column" width="254px">
                                    <span>Логин: {profile.login}</span>
                                    <span>Пароль: {profile.password}</span>
                                </Box>
                            </Alert>
                        </ListItem>
                    )
                })}
            </List>
        </Paper>
    );
};

