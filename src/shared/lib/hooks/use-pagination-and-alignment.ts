import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {AlignmentType} from "@/shared";

export const usePaginationAndAlignment = (favoritesHelpsLength: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(favoritesHelpsLength / itemsPerPage);

    const [searchParams, setSearchParams] = useSearchParams();
    const initialAlignment = (searchParams.get("view") as AlignmentType) || "left";
    const [alignment, setAlignment] = useState<AlignmentType>(initialAlignment);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    useEffect(() => {
        if (!searchParams.has("view")) {
            setSearchParams(params => {
                params.set("view", "left");
                return params;
            });
        }
    }, [searchParams, setSearchParams]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const handleAlignmentChange = (newAlignment: AlignmentType) => {
        setAlignment(newAlignment);
        setSearchParams(params => {
            params.set("view", newAlignment);
            return params;
        });
    };

    return {
        currentPage,
        totalPages,
        alignment,
        indexOfFirstItem,
        indexOfLastItem,
        handleAlignmentChange,
        setCurrentPage
    };
};

