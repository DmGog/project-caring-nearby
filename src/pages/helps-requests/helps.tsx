import {Box, Pagination, Paper, Typography} from "@mui/material";
import {CardsListItemRequest, CardsRequest, FilterController} from "@/widgets";
import {CardMap, HelpsPageSkeleton, useHelpRequestsQuery, useUserHelpFavoritesRequestsQuery} from "@/features";
import {NotFoundResult, SearchInput, ToggleButtonsGroup, usePaginationAndAlignment} from "@/shared";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import debounce from "lodash.debounce";
import dayjs, {Dayjs} from "dayjs";

export const Helps = () => {
    const {data, isLoading: isLoadingHelpRequests} = useHelpRequestsQuery();
    const {data: favoritesHelps} = useUserHelpFavoritesRequestsQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [filteredData, setFilteredData] = useState(data || []);
    const [filters, setFilters] = useState<string[]>(searchParams.getAll("filter"));
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    const {
        currentPage,
        totalPages,
        alignment,
        indexOfFirstItem,
        indexOfLastItem,
        handleAlignmentChange,
        setCurrentPage
    } = usePaginationAndAlignment(filteredData.length);

    useEffect(() => {
        if (!searchParams.has("view")) {
            setSearchParams(params => {
                params.set("view", "left");
                return params;
            });
        }
        let filtered = (data || []).filter(item => {

            const matchesFilters = filters.length === 0 || filters.every(filter =>
                item.requesterType.includes(filter) ||
                item.helpType.includes(filter) ||
                item.helperRequirements.qualification.includes(filter) ||
                item.helperRequirements.helperType.includes(filter) ||
                (filter === "online" && item.helperRequirements.isOnline) ||
                (filter === "offline" && !item.helperRequirements.isOnline)
            );

            const matchesDate = selectedDate ? dayjs(item.endingDate).isBefore(selectedDate, "day") : true;

            return matchesFilters && matchesDate;
        });

        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.organization.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filtered);
    }, [data, searchTerm, filters, selectedDate]);


    const handleSearch = debounce((value: string) => {
        setSearchParams(value ? {search: value} : {});
        if (value.trim()) {
            const lowercasedValue = value.toLowerCase();
            const filtered = (filteredData || data || []).filter(item =>
                item.title.toLowerCase().includes(lowercasedValue) ||
                item.organization.title.toLowerCase().includes(lowercasedValue)
            );
            setFilteredData(filtered);
            setCurrentPage(1);
        }
    }, 600);

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

    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Paper variant="outlined" elevation={0} square sx={{
            display: "flex", flexDirection: "column", alignItems: "flex-start",
            width: "100%", backgroundColor: "#f5f5f5", padding: "30px 40px 64px"
        }}>
            <Typography variant="h4" mb="20px">Запросы о помощи</Typography>
            {isLoadingHelpRequests ? <HelpsPageSkeleton/> : (
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
                                <ToggleButtonsGroup alignment={alignment} onAlignmentChange={handleAlignmentChange}/>
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
                                        <CardsRequest data={currentItems} favoriteHelps={favoritesHelps ?? []}/>}
                                    {alignment === "center" &&
                                        <CardsListItemRequest data={currentItems}
                                                              favoriteHelps={favoritesHelps ?? []}/>}
                                    {alignment === "right" && <CardMap/>}
                                    {alignment !== "right" && (
                                        <Pagination
                                            sx={{mt: "30px"}}
                                            count={totalPages}
                                            page={currentPage}
                                            onChange={(_, value) => setCurrentPage(value)}
                                            color="primary"
                                        />
                                    )}
                                </Box>)}
                        </Paper>
                    </Box>
                </Box>
            )}
        </Paper>
    );
};