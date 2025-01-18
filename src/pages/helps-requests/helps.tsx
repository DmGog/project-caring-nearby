import {Box, Pagination, Paper, Typography} from "@mui/material";
import {CardsListItemRequest, CardsRequest, FilterController} from "@/widgets";
import {
    CardMap,
    HelpsPageSkeleton,
    useFilters,
    useHelpRequestsQuery,
    useUserHelpFavoritesRequestsQuery
} from "@/features";
import {NotFoundResult, SearchInput, ToggleButtonsGroup, usePaginationAndAlignment} from "@/shared";


export const Helps = () => {
    const { data, isLoading: isLoadingHelpRequests } = useHelpRequestsQuery();
    const { data: favoritesHelps } = useUserHelpFavoritesRequestsQuery();

    const {
        typedSearchTerm,
        filters,
        selectedDate,
        filteredData,
        handleSearchChange,
        handleFilterChange,
        handleDateChange,
    } = useFilters(data || []);

    const {
        currentPage,
        totalPages,
        alignment,
        indexOfFirstItem,
        indexOfLastItem,
        handleAlignmentChange,
        setCurrentPage,
    } = usePaginationAndAlignment(filteredData.length);

    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Paper
            variant="outlined"
            elevation={0}
            square
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                backgroundColor: "#f5f5f5",
                padding: "30px 40px 64px",
            }}
        >
            <Typography variant="h4" mb="20px">
                Запросы о помощи
            </Typography>
            {isLoadingHelpRequests ? (
                <HelpsPageSkeleton />
            ) : (
                <Box display="flex" gap="20px" width="100%">
                    <FilterController
                        onFilterChange={handleFilterChange}
                        selectedFilters={filters}
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                    />
                    <Box display="flex" flexDirection="column" width="100%" gap="32px">
                        <SearchInput searchTerm={typedSearchTerm} onSearchChange={handleSearchChange} />
                        <Paper
                            variant="outlined"
                            elevation={0}
                            sx={{
                                width: "1080px",
                                backgroundColor: "#FFFFFF",
                                padding: "12px 36px 40px",
                            }}
                        >
                            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" height="40px" mb="20px">
                                <Typography variant="h6">Найдено: {filteredData.length}</Typography>
                                <ToggleButtonsGroup alignment={alignment} onAlignmentChange={handleAlignmentChange} />
                            </Box>
                            {!data ? (
                                <NotFoundResult img="infoNotImage" title="Ошибка! Не удалось загрузить запросы" color="red" />
                            ) : (
                                <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                                    {filteredData.length < 1 && (
                                        <NotFoundResult img={"resultNotImage"} title={"Запросы не найдены"} />
                                    )}
                                    {alignment === "left" && (
                                        <CardsRequest data={currentItems} favoriteHelps={favoritesHelps ?? []} />
                                    )}
                                    {alignment === "center" && (
                                        <CardsListItemRequest data={currentItems} favoriteHelps={favoritesHelps ?? []} />
                                    )}
                                    {alignment === "right" && <CardMap />}
                                    {alignment !== "right" && (
                                        <Pagination
                                            sx={{ mt: "30px" }}
                                            count={totalPages}
                                            page={currentPage}
                                            onChange={(_, value) => setCurrentPage(value)}
                                            color="primary"
                                        />
                                    )}
                                </Box>
                            )}
                        </Paper>
                    </Box>
                </Box>
            )}
        </Paper>
    );
};
