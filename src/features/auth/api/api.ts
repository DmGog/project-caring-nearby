import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {SignInArgs, SignInResponse} from "@/features/auth/api/types";


export const signInApi = createApi({
    reducerPath: "signInApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://natticharity.eveloth.ru/"
    }),

    endpoints: builder => ({
        login: builder.mutation<SignInResponse, SignInArgs>({
            query: body => ({
                url: "api/auth",
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            }),
        }),
    }),
});

export const {useLoginMutation} = signInApi
