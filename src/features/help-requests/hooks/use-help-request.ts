import {
    useAddHelpRequestFavouritesMutation,
    useContributeMutation,
    useRemoveHelpRequestFavouritesMutation
} from "@/features";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {PATH} from "@/app/router";

export const useHelpRequest = () => {
    const [addFavorite] = useAddHelpRequestFavouritesMutation();
    const [removeFavorite] = useRemoveHelpRequestFavouritesMutation();
    const [addContribute] = useContributeMutation()
    const navigate = useNavigate()
    const handleNavigateRequestHelp = (id: string) => {
        navigate(PATH.HELPS.REQUEST_HELP.replace(":id", id))
    }

    const handleAddContribute = async (id: string) => {
        try {
            const response = await addContribute({id})
            if (response.error?.originalStatus === 500) {
                toast.error("Ошибка попробуйте еще раз")
            } else {
                toast.success("Успех! Спасибо за помощь")
            }
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

            if (response.error?.originalStatus === 500) {
                toast.error("Ошибка! Попробуйте еще раз");
            } else {
                toast.success(`Успех! ${action === "add" ? "Добавлено в избранное" : "Удалено из избранного"}`);
            }
        } catch (error) {
            if (error) toast.error("Ошибка! Попробуйте еще раз");
        }
    };

    return {
        handleAddContribute,
        handleNavigateRequestHelp,
        handleAddFavorite: (id: string) => handleFavoriteAction(id, "add"),
        handleRemoveFavorite: (id: string) => handleFavoriteAction(id, "remove")
    };
};
