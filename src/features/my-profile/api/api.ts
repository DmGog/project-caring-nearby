import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {UserType} from "./types";

export const profileApi = createApi({
    reducerPath: "profileApi",
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
    tagTypes: ["UserProfile", "UserFavourites"],
    endpoints: (builder) => ({
        userProfile: builder.query<UserType, void>({
            query: () => "api/user",
            providesTags: ["UserProfile"],
            keepUnusedDataFor: 5,
        }),
        userHelpRequests: builder.query<string[], void>({
            query: () => "api/user/favourites",
            providesTags: ["UserFavourites"],
            keepUnusedDataFor: 5,
        }),
        addHelpRequestFavourites: builder.mutation<void, { requestId: string }>({
            query: (body) => ({
                url: "api/user/favourites",
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            }),
            invalidatesTags: ["UserFavourites"],
        }),
        removeHelpRequestFavourites: builder.mutation<void, { requestId: string }>({
            query: ({requestId}) => ({
                url: `api/user/favourites/${requestId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["UserFavourites"],
        }),
    }),
});

export const {
    useUserProfileQuery,
    useUserHelpRequestsQuery,
    useAddHelpRequestFavouritesMutation,
    useRemoveHelpRequestFavouritesMutation
} = profileApi;
