import {Container, Typography} from "@mui/material";
import NotFoundResultImage from "@/shared/assets/images/not-found-result.webp"
import NotFoundInfo from "@/shared/assets/images/not-found.webp"

type Title = "Ошибка! Не удалось загрузить информацию" | "Запросы не найдены" | "Ошибка! Не удалось загрузить запросы"


type Props = {
    img: "infoNotImage" | "resultNotImage"
    title: Title
    color?: string
}
export const NotFoundResult = ({img, title, color}: Props) => {
    return (
        <Container sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: "843px"
        }}>
            <img src={img === "resultNotImage" ? NotFoundResultImage : NotFoundInfo} alt={"нет результата"}/>
            <Typography variant="h5" mt="20px" color={color || ""}>{title}</Typography>
        </Container>
    );
};

