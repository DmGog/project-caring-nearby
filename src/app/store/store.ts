import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {appReducer} from "@/entities/app/model/app-slice";
import {profileApi} from "@/features/my-profile";
import {signInApi} from "@/features/auth";
import {helpRequestsApi} from "@/features/help-requests";


export const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            signInApi.middleware, profileApi.middleware, helpRequestsApi.middleware,
        ),
    reducer: {
        app: appReducer,
        [signInApi.reducerPath]: signInApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [helpRequestsApi.reducerPath]: helpRequestsApi.reducer,
    },
})


export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppRootState>();