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
import dayjs, {Dayjs} from "dayjs";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

type Props = {
    selectedFilters: string[];
    onFilterChange: (selectedFilters: string[]) => void;
    selectedDate: Dayjs | null;
    onDateChange: (date: Dayjs | null) => void;
}

export const FilterController = ({selectedFilters, onFilterChange, selectedDate, onDateChange}: Props) => {

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const filtersFromParams = searchParams.getAll("filter");
        const dateFromParams = searchParams.get("date");
        if (filtersFromParams.length > 0) {
            onFilterChange(filtersFromParams);
        }
        if (dateFromParams) {
            onDateChange(dayjs(dateFromParams));
        }
    }, []);

    const handleChange = (filter: string) => {
        const newFilters = selectedFilters.includes(filter)
            ? selectedFilters.filter(f => f !== filter)
            : [...selectedFilters, filter];
        onFilterChange(newFilters);
        setSearchParams(params => {
            params.delete("filter");
            newFilters.forEach(filter => params.append("filter", filter));
            return params;
        });
    };

    const handleDateChange = (date: Dayjs | null) => {
        onDateChange(date);
        setSearchParams(params => {
            if (date) {
                params.set("date", date.toISOString());
            } else {
                params.delete("date");
            }
            return params;
        });
    };

    const handleResetFilters = () => {
        onFilterChange([]);
        onDateChange(null);
        setSearchParams({});
    };
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
                                  label="Пенсионеры"
                                  checked={selectedFilters.includes("person")}
                                  onChange={() => handleChange("person")}/>
                <FormControlLabel sx={{paddingLeft: "9px"}} control={<Checkbox color={"primary"} size={"medium"}/>}
                                  label="Дома престарелых"
                                  checked={selectedFilters.includes("organization")}
                                  onChange={() => handleChange("organization")}
                />
            </FormGroup>
            <FormGroup>
                <FormLabel>Чем мы помогаем</FormLabel>
                <FormControlLabel sx={{paddingLeft: "9px"}} control={<Checkbox color={"primary"} size={"medium"}/>}
                                  label="Вещи"
                                  checked={selectedFilters.includes("material")}
                                  onChange={() => handleChange("material")}
                />
                <FormControlLabel sx={{paddingLeft: "9px"}} control={<Checkbox color={"primary"} size={"medium"}/>}
                                  label="Финансирование"
                                  checked={selectedFilters.includes("finance")}
                                  onChange={() => handleChange("finance")}
                />
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
                                          label="Квалифицированная"
                                          checked={selectedFilters.includes("professional")}
                                          onChange={() => handleChange("professional")}

                        />
                        <FormControlLabel sx={{paddingLeft: "9px"}}
                                          control={<Checkbox color={"primary"} size={"medium"}/>}
                                          label="Не требует профессии"
                                          checked={selectedFilters.includes("common")}
                                          onChange={() => handleChange("common")}
                        />
                    </FormGroup>
                    <FormGroup sx={{marginBottom: "16px"}}>
                        <FormLabel>Формат</FormLabel>
                        <FormControlLabel sx={{paddingLeft: "9px"}}
                                          control={<Checkbox color={"primary"} size={"medium"}/>}
                                          label="Онлайн"
                                          checked={selectedFilters.includes("true")}
                                          onChange={() => handleChange("true")}
                        />
                        <FormControlLabel sx={{paddingLeft: "9px"}}
                                          control={<Checkbox color={"primary"} size={"medium"}/>}
                                          label="Офлайн"
                                          checked={selectedFilters.includes("false")}
                                          onChange={() => handleChange("false")}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Необходимо волонтеров</FormLabel>
                        <FormControlLabel sx={{paddingLeft: "9px"}}
                                          control={<Checkbox color={"primary"} size={"medium"}/>}
                                          label="Группа"
                                          checked={selectedFilters.includes("group")}
                                          onChange={() => handleChange("group")}
                        />
                        <FormControlLabel sx={{paddingLeft: "9px"}}
                                          control={<Checkbox color={"primary"} size={"medium"}/>}
                                          label="Один"
                                          checked={selectedFilters.includes("single")}
                                          onChange={() => handleChange("single")}
                        />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <FormGroup sx={{marginBottom: "40px"}}>
                <FormLabel sx={{
                    marginBottom: "10px"
                }}>Помощь актуальна до:</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={"Выберите дату"}
                                value={selectedDate}
                                onChange={handleDateChange}
                    />
                </LocalizationProvider>
            </FormGroup>
            <Button disabled={selectedFilters.length < 1 && !selectedDate } onClick={handleResetFilters} size={"large"}
                    color={"inherit"}
                    variant={"outlined"}
                    fullWidth>CБРОСИТЬ</Button>
        </Box>
    );
};

