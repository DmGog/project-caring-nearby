import {
    useAddHelpRequestFavouritesMutation, useContributeMutation,
    useRemoveHelpRequestFavouritesMutation
} from "@/features";
import {toast} from "react-toastify";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export const useHelpRequest = () => {
    const [addFavorite] = useAddHelpRequestFavouritesMutation();
    const [removeFavorite] = useRemoveHelpRequestFavouritesMutation();
    const [addContribute] = useContributeMutation()

    const handleAddContribute = async (id: string) => {
        try {
            await addContribute({id})
            toast.success("Успех! Спасибо за помощь")
        } catch (error) {
            if (error) {
                toast.error("Ошибка попробуйте еще раз")
            }
        }
    }
    const handleFavoriteAction = async (id: string, action: "add" | "remove") => {
        try {
            const response = action === "add"
                ? await addFavorite({requestId: id})
                : await removeFavorite({requestId: id});

            if ("error" in response) {
                const error = response.error;
                if (isFetchBaseQueryError(error) && error.status === 500) {
                    toast.error("Ошибка! Попробуйте еще раз");
                } else {
                    toast.success(`Успех! ${action === "add" ? "Добавлено в избранное" : "Удалено из избранного"}`);
                }
            } else {
                toast.success(`Успех! ${action === "add" ? "Добавлено в избранное" : "Удалено из избранного"}`);
            }
        } catch (error) {
            if (error) toast.error("Ошибка! Попробуйте еще раз");
        }
    };
    const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
        return typeof error === "object" && error !== null && "status" in error;
    };

    return {
        handleAddContribute,
        handleAddFavorite: (id: string) => handleFavoriteAction(id, "add"),
        handleRemoveFavorite: (id: string) => handleFavoriteAction(id, "remove")
    };
};
