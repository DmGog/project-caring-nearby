import {FormControl, Input, InputAdornment, Paper, Typography} from "@mui/material";
import {Search} from "@mui/icons-material";

type Props = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
};
export const SearchInput = ({searchTerm, onSearchChange}: Props) => {
    return (
        <Paper variant="outlined" elevation={0} sx={{
            display: "flex", flexDirection: "column", alignItems: "flex-start",
            width: "100%", backgroundColor: "#fff", borderRadius: "4px",
            padding: "20px 36px 40px", height: "149px",
        }}>
            <Typography variant="h6" mb="10px">Найти запрос</Typography>
            <FormControl fullWidth sx={{m: 1}} variant="standard">
                <Input
                    placeholder="Введите название задачи или организации"
                    id="search"
                    startAdornment={<InputAdornment position="start"><Search/></InputAdornment>}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </FormControl>
        </Paper>
    );
};
