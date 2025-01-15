import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {HelpRequest, HelpRequests} from "./types";

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
    tagTypes: ["HelpRequest"],
    endpoints: (builder) => ({
        helpRequests: builder.query<HelpRequests, void>({
            query: () => "api/request",
            providesTags: ["HelpRequest"],
            keepUnusedDataFor: 5,
        }),
        helpRequestById: builder.query<HelpRequest, string>({
            query: (id) => ({
                method: "GET",
                url: `api/request/${id}`
            }),
        }),
        contribute: builder.mutation<string, { id: string }>({
            query: ({id}) => ({
                url: `api/request/${id}/contribution`,
                method: "POST",
            }),
            invalidatesTags: ["HelpRequest"],
        }),
    }),
});

export const {useHelpRequestsQuery, useContributeMutation, useHelpRequestByIdQuery} = helpRequestsApi;
