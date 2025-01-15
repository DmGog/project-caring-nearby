import {Box, Pagination, Paper, Typography} from "@mui/material";
import {CardsListItemRequest, CardsRequest, FilterController} from "@/widgets";
import {CardMap, useHelpRequestsQuery, useUserHelpRequestsQuery} from "@/features";
import {AlignmentType, NotFoundResult, SearchInput, ToggleButtonsGroup} from "@/shared";
import {useState} from "react";


export const Helps = () => {
    const {data} = useHelpRequestsQuery()
    const {data: favoritesHelps} = useUserHelpRequestsQuery();
    const [alignment, setAlignment] = useState<AlignmentType>("left");
    const handleAlignmentChange = (newAlignment: AlignmentType) => {
        setAlignment(newAlignment);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];
    const handlePageChange = (value: number) => {
        setCurrentPage(value);
    };
    if (!data) {
        return <NotFoundResult img={"infoNotImage"} title={"Ошибка! Не удалось загрузить запросы"} color={"red"}/>
    }
    if (!favoritesHelps) {
        return null
    }
    return (
        <Paper variant="outlined" elevation={0} square sx={{
            display: "flex", flexDirection: "column", alignItems: "flex-start",
            width: "100%",
            backgroundColor: " #f5f5f5",
            padding: "30px 40px 64px"
        }}>
            <Typography variant="h4" mb="20px">Запросы о помощи</Typography>
            <Box display="flex" gap="20px" width="100%">
                <FilterController/>
                <Box display="flex" flexDirection="column" width="100%" gap="32px">
                    <SearchInput/>
                    <Paper variant="outlined" elevation={0} sx={{
                        width: "100%",
                        backgroundColor: "#FFFFFF",
                        padding: "12px 36px 40px",
                    }}>

                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%"
                             height="40px" mb="20px">
                            {alignment !== "right" ? <Typography variant="h6">Найдено: {data.length}</Typography> :
                                <div></div>}
                            <ToggleButtonsGroup alignment={alignment} onAlignmentChange={handleAlignmentChange}/>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                            {(() => {
                                switch (alignment) {
                                    case "left":
                                        return <CardsRequest data={currentItems} favoriteHelps={favoritesHelps}/>;
                                    case "center":
                                        return <CardsListItemRequest data={currentItems}
                                                                     favoriteHelps={favoritesHelps}/>;
                                    case "right":
                                        return <CardMap/>;
                                    default:
                                        return null;
                                }
                            })()}
                            {alignment !== "right" && <Pagination
                                sx={{
                                    mt: "30px"
                                }}
                                count={Math.ceil((data ? data.length : 0) / itemsPerPage)}
                                page={currentPage}
                                onChange={(_, value) => handlePageChange(value)}
                                color="primary"
                            />}
                        </Box>
                    </Paper>
                </Box>
            </Box>

        </Paper>
    );
};

