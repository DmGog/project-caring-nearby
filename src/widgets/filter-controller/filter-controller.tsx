import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    FormGroup,
    FormLabel,
    Typography
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {FilterGroup} from "@/shared";
import {mainFilters, volunteerActivity} from "./data";
import "dayjs/locale/ru";

dayjs.locale("ru");

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
            <Typography variant="h6" mb="25px">Фильтрация</Typography>
            <FilterGroup marginBottom="20px" filters={mainFilters} selectedFilters={selectedFilters}
                         handleChange={handleChange}/>
            <Accordion sx={{marginBottom: "20px"}}>
                <AccordionSummary
                    aria-controls="panel-content"
                    id="panel"
                >
                    <Typography variant="body1">Волонтерство</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{
                    backgroundColor: "#f5f5f5"
                }}>
                    <FilterGroup marginBottom="16px" filters={volunteerActivity} selectedFilters={selectedFilters}
                                 handleChange={handleChange}/>
                </AccordionDetails>
            </Accordion>
            <FormGroup sx={{marginBottom: "40px"}}>
                <FormLabel sx={{
                    marginBottom: "10px"
                }}>Помощь актуальна до:</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Выберите дату"
                                value={selectedDate}
                                onChange={handleDateChange}
                    />
                </LocalizationProvider>
            </FormGroup>
            <Button disabled={selectedFilters.length < 1 && !selectedDate} onClick={handleResetFilters} size="large"
                    color="inherit"
                    variant="outlined"
                    fullWidth>CБРОСИТЬ</Button>
        </Box>
    );
};