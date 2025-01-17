import {Box, Link, Paper} from "@mui/material";

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
            <Box display="flex" justifyContent="space-around" maxWidth="1548px" width="100%" padding="0 24px">
                <Link href="https://github.com/DmGog/project-caring-nearby"
                      target="_blank"
                      rel="noopener noreferrer" sx={styles}>Github проекта</Link>
                <Link href="https://t.me/DmGog_37"
                      target="_blank"
                      rel="noopener noreferrer" sx={styles}>Мой Telegram</Link>
            </Box>
        </Paper>
    );
};

const styles = {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    ":hover": {
        color: "#1976d2"
    }
}