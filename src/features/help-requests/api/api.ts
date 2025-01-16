import {HelpRequest, HelpRequests} from "./types";
import {baseApi} from "@/app";
export const helpRequestsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        helpRequests: builder.query<HelpRequests, void>({
            query: () => "request",
            providesTags: ["HelpRequest"],
        }),
        helpRequestById: builder.query<HelpRequest, string>({
            query: (id) => `request/${id}`,
            providesTags: ["HelpRequest"],
        }),
        contribute: builder.mutation<string, { id: string }>({
            query: ({id}) => ({
                url: `request/${id}/contribution`,
                method: "POST",
            }),
            invalidatesTags: ["HelpRequest"],
        }),
    }),
});

export const {
    useHelpRequestsQuery,
    useContributeMutation,
    useHelpRequestByIdQuery,
} = helpRequestsApi;
