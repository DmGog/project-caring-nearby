import {
    CardMap,
    HelpRequest,
    HelpRequests,
    useHelpRequestsQuery, useUserHelpFavoritesRequestsQuery,
} from "@/features";
import {AlignmentType, NotFoundResult, ToggleButtonsGroup} from "@/shared";
import {CardsListItemRequest, CardsRequest} from "@/widgets";
import {Box, Pagination} from "@mui/material";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";


export const Favorites = () => {
    const {data: helpRequests} = useHelpRequestsQuery();
    const {data: favoritesHelps, isLoading} = useUserHelpFavoritesRequestsQuery();
    const [currentPage, setCurrentPage] = useState(1);

    const [searchParams, setSearchParams] = useSearchParams();
    const initialAlignment = (searchParams.get("view") as AlignmentType) || "left";
    const [alignment, setAlignment] = useState<AlignmentType>(initialAlignment);
    const handleAlignmentChange = (newAlignment: AlignmentType) => {
        setAlignment(newAlignment);
        setSearchParams(params => {
            params.set("view", newAlignment);
            return params;
        });
    };

    useEffect(() => {
        if (!searchParams.has("view")) {
            setSearchParams(params => {
                params.set("view", "left");
                return params;
            });
        }
    })

    if (!helpRequests) {
        return <NotFoundResult title={"Ошибка! Не удалось загрузить запросы"} img={"infoNotImage"} color={"red"}/>;
    } else if (helpRequests.length < 1) {
        return <NotFoundResult title={"Запросы не найдены"} img={"resultNotImage"} color={"red"}/>;
    }

    const favoriteRequests: HelpRequests = favoritesHelps
        ? helpRequests.filter((request: HelpRequest) =>
            favoritesHelps.includes(request.id)
        )
        : [];

    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = favoriteRequests.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (value: number) => {
        setCurrentPage(value);
    };

    if (!favoritesHelps) return null;

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
            <Box  position="absolute" top="-40px" right="0px">
                <ToggleButtonsGroup alignment={alignment} onAlignmentChange={handleAlignmentChange}/>
            </Box>
            {!favoritesHelps &&
                <NotFoundResult title="Ошибка! Не удалось загрузить запросы" img="infoNotImage" color="red"/>}
            {favoriteRequests.length < 1 && <NotFoundResult title="Запросы не найдены" img="resultNotImage"/>}
            {alignment === "left" && <CardsRequest data={currentItems} favoriteHelps={favoritesHelps}/>}
            {alignment === "center" && <CardsListItemRequest data={currentItems} favoriteHelps={favoritesHelps}/>}
            {alignment === "right" && <CardMap/>}
            <Pagination
                disabled={isLoading}
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
