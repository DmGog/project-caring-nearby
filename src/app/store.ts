import {signInApi} from "@/features/auth/api";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            signInApi.middleware,
        ),
    reducer: {
        [signInApi.reducerPath]: signInApi.reducer,
    },
})