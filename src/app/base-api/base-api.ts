import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
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
    }),
    tagTypes: ["UserProfile", "HelpRequest"],
    endpoints: () => ({}),
});