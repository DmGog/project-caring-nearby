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
    endpoints: (builder) => ({
        userProfile: builder.query<UserType, void>({
            query: () => "api/user",
        }),
    }),
});
export const {useUserProfileQuery} = profileApi;