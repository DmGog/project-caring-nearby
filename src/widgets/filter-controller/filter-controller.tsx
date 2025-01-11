import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Typography
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export const FilterController = () => {
    return (
        <Box sx={{
            padding: "20px 20px 30px",
            width: "420px",
            borderRadius: "4px",
            backgroundColor: "#fff",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
            borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        }}>
            <Typography variant={"h6"} mb={"25px"}>Фильтрация</Typography>
            <FormGroup sx={{marginBottom: "20px"}}>
                <FormLabel>Кому мы помогаем</FormLabel>
                <FormControlLabel sx={{paddingLeft: "9px"}} control={<Checkbox color={"primary"} size={"medium"}/>}
                                  label="Пенсионеры"/>
                <FormControlLabel sx={{paddingLeft: "9px"}} control={<Checkbox color={"primary"} size={"medium"}/>}
                                  label="Дома престарелых"/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Чем мы помогаем</FormLabel>
                <FormControlLabel sx={{paddingLeft: "9px"}} control={<Checkbox color={"primary"} size={"medium"}/>}
                                  label="Вещи"/>
                <FormControlLabel sx={{paddingLeft: "9px"}} control={<Checkbox color={"primary"} size={"medium"}/>}
                                  label="Финансирование"/>
            </FormGroup>
            <Accordion sx={{marginBottom: "20px"}}>
                <AccordionSummary
                    aria-controls="panel-content"
                    id="panel"
                >
                    <Typography variant={"body1"}>Волонтерство</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{
                    backgroundColor: "#f5f5f5"
                }}>
                    <FormGroup sx={{marginBottom: "16px"}}>
                        <FormLabel>Специализация</FormLabel>
                        <FormControlLabel sx={{paddingLeft: "9px"}}
                                          control={<Checkbox color={"primary"} size={"medium"}/>}
                                          label="Квалифицированная"/>
                        <FormControlLabel sx={{paddingLeft: "9px"}}
                                          control={<Checkbox color={"primary"} size={"medium"}/>}
                                          label="Не требует профессии"/>
                    </FormGroup>
                    <FormGroup sx={{marginBottom: "16px"}}>
                        <FormLabel>Формат</FormLabel>
                        <FormControlLabel sx={{paddingLeft: "9px"}}
                                          control={<Checkbox color={"primary"} size={"medium"}/>}
                                          label="Онлайн"/>
                        <FormControlLabel sx={{paddingLeft: "9px"}}
                                          control={<Checkbox color={"primary"} size={"medium"}/>}
                                          label="Офлайн"/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Необходимо волонтеров</FormLabel>
                        <FormControlLabel sx={{paddingLeft: "9px"}}
                                          control={<Checkbox color={"primary"} size={"medium"}/>}
                                          label="Группа"/>
                        <FormControlLabel sx={{paddingLeft: "9px"}}
                                          control={<Checkbox color={"primary"} size={"medium"}/>}
                                          label="Один"/>
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <FormGroup sx={{marginBottom: "40px"}}>
                <FormLabel sx={{
                    marginBottom: "10px"
                }}>Помощь актуальна до:</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={"Выберите дату"}/>
                </LocalizationProvider>
            </FormGroup>
            <Button size={"large"} color={"inherit"} variant={"outlined"} fullWidth>CБРОСИТЬ</Button>
        </Box>
    );
};

