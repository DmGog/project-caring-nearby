import {CardMap, HelpRequest, HelpRequests, useHelpRequestsQuery, useUserHelpFavoritesRequestsQuery,} from "@/features";
import {NotFoundResult, ToggleButtonsGroup, usePaginationAndAlignment} from "@/shared";
import {CardsListItemRequest, CardsRequest} from "@/widgets";
import {Box, Pagination, Skeleton} from "@mui/material";


export const Favorites = () => {
    const {data: helpRequests, isLoading: isLoadingRequests} = useHelpRequestsQuery();
    const {data: favoritesHelps, isLoading} = useUserHelpFavoritesRequestsQuery();

    const {
        currentPage,
        totalPages,
        alignment,
        indexOfFirstItem,
        indexOfLastItem,
        handleAlignmentChange,
        setCurrentPage
    } = usePaginationAndAlignment(favoritesHelps?.length ?? 0);

    const favoriteRequests: HelpRequests = helpRequests?.filter((request: HelpRequest) => favoritesHelps?.includes(request.id)) || [];

    const currentItems = favoriteRequests.slice(indexOfFirstItem, indexOfLastItem);

    const isDisabled = isLoading || isLoadingRequests

    if (isDisabled) {
        return <Skeleton variant="rounded" width="1008px" height="853px" sx={{pt: "20px"}}/>
    }
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
            {!favoritesHelps &&
                <NotFoundResult title="Ошибка! Не удалось загрузить запросы" img="infoNotImage" color="red"/>}
            {favoriteRequests.length < 1 && <NotFoundResult title="Запросы не найдены" img="resultNotImage"/>}
            {alignment === "left" && <CardsRequest data={currentItems} favoriteHelps={favoritesHelps ?? []}/>}
            {alignment === "center" && <CardsListItemRequest data={currentItems} favoriteHelps={favoritesHelps ?? []}/>}
            {alignment === "right" && <CardMap/>}
            {favoriteRequests.length >= 1 &&
                <Pagination
                    disabled={isDisabled}
                    sx={{
                        pt: "30px"
                    }}
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, value) => setCurrentPage(value)}
                    color="primary"
                />}
        </Box>
    );
};
