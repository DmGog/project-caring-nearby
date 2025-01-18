import {
    useAddHelpRequestFavouritesMutation,
    useContributeMutation,
    useRemoveHelpRequestFavouritesMutation
} from "@/features";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {PATH} from "@/app/router";
import {isFetchBaseQueryError} from "@/shared";
import {MouseEvent, useState} from "react";
import dayjs from "dayjs";

export const useHelpRequest = (isFavorite: boolean, dateClose: string | null, requestGoal: number | null, requestGoalCurrentValue: number | null) => {
    const [addFavorite] = useAddHelpRequestFavouritesMutation();
    const [removeFavorite] = useRemoveHelpRequestFavouritesMutation();
    const [addContribute] = useContributeMutation()
    const navigate = useNavigate()
    const [isDisabledContribute, setIsDisabledContribute] = useState(false)
    const [isDisabledFavorite, setIsDisabledFavorite] = useState(false)
    const handleNavigateRequestHelp = (id: string) => {
        navigate(PATH.REQUEST_HELP.replace(":id", id))
    }

    const handleAddContribute = async (id: string) => {
        setIsDisabledContribute(true)
        try {
            const response = await addContribute({id})
            if ("error" in response && isFetchBaseQueryError(response.error) && response.error.originalStatus === 500) {
                toast.error("Ошибка попробуйте еще раз")
            } else {
                toast.success("Успех! Спасибо за помощь")
            }
        } catch {
            toast.error("Ошибка попробуйте еще раз")
        } finally {
            setIsDisabledContribute(false)
        }
    }
    const handleFavoriteAction = async (id: string, action: "add" | "remove") => {
        setIsDisabledFavorite(true)
        try {
            const response = action === "add"
                ? await addFavorite({requestId: id})
                : await removeFavorite({requestId: id});

            if ("error" in response && isFetchBaseQueryError(response.error) && response.error.originalStatus === 500) {
                toast.error("Ошибка! Попробуйте еще раз");
            } else {
                toast.success(`Успех! ${action === "add" ? "Добавлено в избранное" : "Удалено из избранного"}`);
            }
        } catch {
            toast.error("Ошибка! Попробуйте еще раз");
        } finally {
            setIsDisabledFavorite(false)
        }
    };

    const handleHelpClick = (id: string) => (e: MouseEvent) => {
        handleAddContribute(id);
        e.stopPropagation();
    };

    const handleFavoriteClick = (id: string) => (e: MouseEvent) => {
        e.stopPropagation();
        (isFavorite ? handleFavoriteAction(id, "remove") : handleFavoriteAction(id, "add"))
    }
    const isExpired = (date: string): boolean => {
        return dayjs(date).isBefore(dayjs(), "day");
    };
    const expired = isExpired(dateClose || "")
    const completed = (requestGoal || 0) < (requestGoalCurrentValue || 0)

    const isDisabled = isDisabledFavorite || isDisabledContribute
    return {
        isDisabled,
        expired,
        completed,
        handleHelpClick,
        handleNavigateRequestHelp,
        handleFavoriteClick
    };
};
