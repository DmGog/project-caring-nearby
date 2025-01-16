import {SignInArgs, SignInResponse} from "./types";
import {baseApi} from "@/app";

export const signInApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<SignInResponse, SignInArgs>({
            query: (body) => ({
                url: "auth",
                method: "POST",
                body
            }),
        }),
    }),
});

export const {useLoginMutation} = signInApi;
