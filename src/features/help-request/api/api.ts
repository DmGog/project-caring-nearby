import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { HelpRequests} from "./types";

export const helpRequestsApi = createApi({
    reducerPath: "helpRequestsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://natticharity.eveloth.ru/",
        prepareHeaders: (headers) => {
            const token = sessionStorage.getItem("token");
            if (token) {
                const t = JSON.parse(token);
                headers.set("Authorization", `Bearer ${t}`);
            }
        },
    }),
    endpoints: (builder) => ({
        helpRequests: builder.query<HelpRequests, void>({
            query: () => "api/request",
        }),
    }),
});

export const {useHelpRequestsQuery} = helpRequestsApi;