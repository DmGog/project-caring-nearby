import {Link} from "react-router-dom";
import {Box, Paper} from "@mui/material";
import s from "./footer.module.scss"

export const Footer = () => {
    return (
        <Paper variant="outlined" square sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "152px",
            width: "100%",
            backgroundColor: "#fff",
            boxShadow: " 0 0 0 1px #e0e0e0"
        }}>
            <Box display="flex" justifyContent="space-between" maxWidth="1548px" width="100%" padding="0 24px">
                <Link className={s.link} to={"#"}>Об ивенте</Link>
                <Link className={s.link} to={"#"}>Github проекта</Link>
                <Link className={s.link} to={"#"}>мой telegram</Link>
            </Box>
        </Paper>
    );
};

