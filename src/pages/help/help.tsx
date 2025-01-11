import {Box, FormControl, Input, InputAdornment, Paper, Typography} from "@mui/material";
import {FilterController} from "@/widgets";
import {Search} from "@mui/icons-material";

export const Help = () => {
    return (
        <Paper variant="outlined" elevation={0} square sx={{
            display: "flex", flexDirection: "column", alignItems: "flex-start",
            width: "100%",
            backgroundColor: " #f5f5f5",
            padding: "30px 40px 64px"
        }}>
            <Typography variant="h4" mb="20px">Запросы о помощи</Typography>
            <Box display="flex" gap="20px" width="100%">
                <FilterController/>
                <Paper variant="outlined" elevation={0} sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                    padding: "20px 36px 40px",
                    height: "149px",
                }}>
                    <Typography variant="h6" mb="10px">Найти запрос</Typography>
                    <FormControl fullWidth sx={{m: 1}} variant="standard">
                        <Input
                            placeholder={"Введите название задачи или организации"}
                            id="search"
                            startAdornment={<InputAdornment position="start"><Search/></InputAdornment>}
                        />
                    </FormControl>
                </Paper>
            </Box>

        </Paper>
    );
};

