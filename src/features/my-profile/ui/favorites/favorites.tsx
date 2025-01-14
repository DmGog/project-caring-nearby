import {
    CardMap,
    HelpRequest,
    HelpRequests,
    NotFoundResult,
    useHelpRequestsQuery,
    useUserHelpRequestsQuery
} from "@/features";
import {AlignmentType, ToggleButtonsGroup} from "@/shared";
import {CardsListItemRequest, CardsRequest} from "@/widgets";
import {Box, Pagination} from "@mui/material";
import {useState} from "react";


export const Favorites = () => {
    const {data: helpRequests} = useHelpRequestsQuery();
    const {data: favoritesHelps} = useUserHelpRequestsQuery();
    const [currentPage, setCurrentPage] = useState(1);

    const [alignment, setAlignment] = useState<AlignmentType>("left");
    const handleAlignmentChange = (newAlignment: AlignmentType) => {
        setAlignment(newAlignment);
    };

    if (!helpRequests) {
        return <NotFoundResult/>;
    } else if (helpRequests.length < 1) {
        return <NotFoundResult/>;
    }

    const favoriteRequests: HelpRequests = favoritesHelps
        ? helpRequests.filter((request: HelpRequest) =>
            favoritesHelps.includes(request.id)
        )
        : [];

    if (favoriteRequests.length < 1) {
        return <NotFoundResult/>
    }
    if (!favoritesHelps) return null

    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = favoriteRequests.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (value: number) => {
        setCurrentPage(value);
    };


    return (
        <Box
            sx={{
                position: "relative",
                p: "20px 0px 0px 0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "973px",
                justifyContent: "space-between"
            }}>
            <Box position="absolute" top="-40px" right="0px">
                <ToggleButtonsGroup alignment={alignment} onAlignmentChange={handleAlignmentChange}/>
            </Box>
            {alignment === "left" && <CardsRequest data={currentItems} favoriteHelps={favoritesHelps}/>}
            {alignment === "center" && <CardsListItemRequest data={currentItems} favoriteHelps={favoritesHelps}/>}
            {alignment === "right" && <CardMap/>}
            <Pagination
                sx={{
                    pt: "30px"
                }}
                count={Math.ceil((favoriteRequests.length) / itemsPerPage)}
                page={currentPage}
                onChange={(_, value) => handlePageChange(value)}
                color="primary"
            />
        </Box>
    );
};
