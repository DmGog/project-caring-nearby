import {Box, Pagination, Paper, Typography} from "@mui/material";
import {CardsRequest, FilterController} from "@/widgets";
import {useHelpRequestsQuery} from "@/features";
import {AlignmentType, SearchInput, ToggleButtonsGroup} from "@/shared";
import {useState} from "react";
import {useNavigate} from "react-router";
import {PATH} from "@/app/router";

export const Help = () => {
    const {data} = useHelpRequestsQuery()
    const navigate = useNavigate()
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
        navigate(PATH.NOT_FOUND_PAGE)
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
                            <Typography variant="h6">Найдено: {data.length}</Typography>
                            <ToggleButtonsGroup alignment={alignment} onAlignmentChange={handleAlignmentChange}/>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                            {alignment === "left" && <CardsRequest data={currentItems}/>}
                            <Pagination
                                sx={{
                                    mt: "30px"
                                }}
                                count={Math.ceil((data ? data.length : 0) / itemsPerPage)}
                                page={currentPage}
                                onChange={(_, value) => handlePageChange(value)}
                                color="primary"
                            />
                        </Box>
                    </Paper>
                </Box>
            </Box>

        </Paper>
    );
};

