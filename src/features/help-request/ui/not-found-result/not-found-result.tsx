import {Container, Typography} from "@mui/material";
import NotFoundResultImage from "@/shared/assets/images/not-found-result.png"

export const NotFoundResult = () => {
    return (
        <Container sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: "843px"
        }}>
            <img src={NotFoundResultImage} alt={"not found result"}/>
            <Typography variant="h5" mt="20px">Запросы не найдены</Typography>
        </Container>
    );
};

