import {
    CardMap,
    HelpRequest,
    HelpRequests,
    ProfilePageSkeleton,
    useHelpRequestsQuery,
    useUserHelpFavoritesRequestsQuery,
} from "@/features";
import {NotFoundResult, ToggleButtonsGroup, usePaginationAndAlignment} from "@/shared";
import {CardsListItemRequest, CardsRequest} from "@/widgets";
import {Box, Pagination} from "@mui/material";


export const Favorites = () => {
    const {data: helpRequests} = useHelpRequestsQuery();
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

    if (!helpRequests) {
        return <NotFoundResult title={"Ошибка! Не удалось загрузить запросы"} img={"infoNotImage"} color={"red"}/>;
    } else if (helpRequests.length < 1) {
        return <NotFoundResult title={"Запросы не найдены"} img={"resultNotImage"} color={"red"}/>;
    }

    const favoriteRequests: HelpRequests = favoritesHelps
        ? helpRequests.filter((request: HelpRequest) => favoritesHelps.includes(request.id))
        : [];

    const currentItems = favoriteRequests.slice(indexOfFirstItem, indexOfLastItem);

    if (isLoading) {
        return <ProfilePageSkeleton/>
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
            <Pagination
                sx={{
                    pt: "30px"
                }}
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
            />
        </Box>
    );
};
