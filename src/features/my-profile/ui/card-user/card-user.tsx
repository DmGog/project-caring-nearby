import {Box, Button, CardContent, CardMedia, Typography} from "@mui/material";
import ProfileDefaultImage from "@/shared/assets/images/profile-default.webp";
import {InfoRow, useLogout} from "@/shared";

type Props = {
    name: string
    lastName: string
    status: string
}
export const CardUser = ({status, name, lastName}: Props) => {
    const handleLogOut = useLogout()

    return (
        <Box>
            <CardMedia component={"img"} src={ProfileDefaultImage} alt={"profile image"} sx={{
                width: "320px",
                height: "240px",
                objectFit: "cover",
                borderRadius: "4px 4px 0 0",
                backgroundColor: "#fff",
                border: "1px solid rgba(0, 0, 0, 0.12)",
            }}/>
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "320px",
                padding: "20px",
                background: "#fff",
                borderRadius: "border-radius: 0 0 4px 4px;",
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
                borderRight: "1px solid rgba(0, 0, 0, 0.12)",

            }}>
                <Typography variant="h6" mb="10px">
                    {name} {lastName}
                </Typography>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginBottom: "50px"
                }}>
                    <InfoRow label="Статус" value={status}/>
                </Box>
                <Button size="large" color="inherit" variant="outlined" fullWidth
                        onClick={handleLogOut}>ВЫЙТИ ИЗ АККАУНТА</Button>
            </CardContent>
        </Box>
    );
};

