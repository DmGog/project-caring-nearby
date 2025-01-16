import {UserType} from "./types";
import {baseApi} from "@/app";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userProfile: builder.query<UserType, void>({
            query: () => "user",
            providesTags: ["UserProfile"],
        }),
        userHelpRequests: builder.query<string[], void>({
            query: () => "user/favourites",
            providesTags: ["HelpRequest"],
        }),
        addHelpRequestFavourites: builder.mutation<void, { requestId: string }>({
            query: (body) => ({
                url: "user/favourites",
                method: "POST",
                body,
            }),
            invalidatesTags: ["HelpRequest"],
        }),
        removeHelpRequestFavourites: builder.mutation<void, { requestId: string }>({
            query: ({requestId}) => ({
                url: `user/favourites/${requestId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["HelpRequest"],
        }),
    }),
});

export const {
    useUserProfileQuery,
    useUserHelpRequestsQuery,
    useAddHelpRequestFavouritesMutation,
    useRemoveHelpRequestFavouritesMutation,
} = profileApi;