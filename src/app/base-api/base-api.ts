import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {toast} from "react-toastify";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: "https://natticharity.eveloth.ru/api/",
            prepareHeaders: (headers) => {
                const token = localStorage.getItem("token");
                if (token) {
                    const t = JSON.parse(token);
                    headers.set("Authorization", `Bearer ${t}`);
                }

                headers.set("Content-Type", "application/json");
                headers.set("Accept", "application/json");
                return headers;
            },
        })(args, api, extraOptions)

        if (result.error) {
            if (result.error.status === "FETCH_ERROR") {
                toast.error("Нет подключения к интернету")
            }
            if (result.error.status === 403) {
                localStorage.clear()
                toast.error("Вы не авторизованы")
            }
            if (result.error.status === 400) {
                toast.error("Не корректные данные")
            }
        }

        return result
    },
    endpoints: () => ({}),
    tagTypes: ["UserProfile", "HelpRequest", "Contribution", "Favourites"],
})