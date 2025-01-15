import {Box, Pagination, Paper, Typography} from "@mui/material";
import {CardsListItemRequest, CardsRequest, FilterController} from "@/widgets";
import {CardMap, useHelpRequestsQuery, useUserHelpRequestsQuery} from "@/features";
import {AlignmentType, NotFoundResult, SearchInput, ToggleButtonsGroup} from "@/shared";
import {useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import debounce from "lodash.debounce";
import dayjs, {Dayjs} from "dayjs";

export const Helps = () => {
    const {data} = useHelpRequestsQuery();
    const {data: favoritesHelps} = useUserHelpRequestsQuery();
    const [alignment, setAlignment] = useState<AlignmentType>("left");
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [filteredData, setFilteredData] = useState(data || []);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const [filters, setFilters] = useState<string[]>(searchParams.getAll("filter"));
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    useEffect(() => {
        const filtered = (data || []).filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.organization.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilters = filters.length === 0 || filters.some(filter =>
                item.requesterType.includes(filter) ||
                item.helpType.includes(filter) ||
                item.helperRequirements.qualification.includes(filter) ||
                item.helperRequirements.helperType.includes(filter) ||
                (filter === "true" && item.helperRequirements.isOnline) ||
                (filter === "false" && !item.helperRequirements.isOnline)
            );
            const matchesDate = selectedDate ? dayjs(item.endingDate).isSame(selectedDate, "day") : true;

            return matchesSearch && matchesFilters && matchesDate;
        });
        setFilteredData(filtered);
    }, [data, searchTerm, filters, selectedDate]);


    const handleSearch = debounce((value: string) => {
        setSearchParams(value ? {search: value} : {});
        if (value.trim()) {
            const lowercasedValue = value.toLowerCase();
            const filtered = (data || []).filter(item =>
                item.title.toLowerCase().includes(lowercasedValue) ||
                item.organization.title.toLowerCase().includes(lowercasedValue)
            );
            setFilteredData(filtered);
            setCurrentPage(1);
        } else {
            setFilteredData(data || []);
        }
    }, 500);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        handleSearch(value);
    };

    const handleFilterChange = (selectedFilters: string[]) => {
        setSearchParams(params => {
            params.delete("filter");
            selectedFilters.forEach(filter => params.append("filter", filter));
            return params;
        });
        setFilters(selectedFilters);
    };
    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);
    };
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (value: number) => {
        setCurrentPage(value);
    };

    if (!favoritesHelps) {
        return null;
    }
    return (
        <Paper variant="outlined" elevation={0} square sx={{
            display: "flex", flexDirection: "column", alignItems: "flex-start",
            width: "100%", backgroundColor: "#f5f5f5", padding: "30px 40px 64px"
        }}>
            <Typography variant="h4" mb="20px">Запросы о помощи</Typography>
            <Box display="flex" gap="20px" width="100%">
                <FilterController onFilterChange={handleFilterChange} selectedFilters={filters}
                                  selectedDate={selectedDate}
                                  onDateChange={handleDateChange}/>
                <Box display="flex" flexDirection="column" width="100%" gap="32px">
                    <SearchInput searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
                    <Paper variant="outlined" elevation={0} sx={{
                        width: "1080px", backgroundColor: "#FFFFFF", padding: "12px 36px 40px",
                    }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%"
                             height="40px" mb="20px">
                            <Typography variant="h6">Найдено: {filteredData.length}</Typography>
                            <ToggleButtonsGroup alignment={alignment} onAlignmentChange={setAlignment}/>
                        </Box>
                        {!data ?
                            <NotFoundResult img="infoNotImage"
                                            title="Ошибка! Не удалось загрузить запросы"
                                            color="red"/>
                            :
                            (<Box display="flex" flexDirection="column" alignItems="center" width="100%">
                                {filteredData.length < 1 &&
                                    <NotFoundResult img={"resultNotImage"} title={"Запросы не найдены"}/>}
                                {alignment === "left" &&
                                    <CardsRequest data={currentItems} favoriteHelps={favoritesHelps}/>}
                                {alignment === "center" &&
                                    <CardsListItemRequest data={currentItems} favoriteHelps={favoritesHelps}/>}
                                {alignment === "right" && <CardMap/>}
                                {alignment !== "right" && (
                                    <Pagination
                                        sx={{mt: "30px"}}
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={(_, value) => handlePageChange(value)}
                                        color="primary"
                                    />
                                )}
                            </Box>)}
                    </Paper>
                </Box>
            </Box>
        </Paper>
    );
};