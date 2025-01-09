import {signInApi} from "@/features/auth/api";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {appReducer} from "@/entities/app/model/app-slice";
import {profileApi} from "@/features/my-profile/api/api";

export const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            signInApi.middleware, profileApi.middleware
        ),
    reducer: {
        app: appReducer,
        [signInApi.reducerPath]: signInApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
    },
})


export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppRootState>();