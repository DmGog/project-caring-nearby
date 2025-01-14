import {createSlice} from "@reduxjs/toolkit";


export type AppState = {
    isLoading: boolean,
}

export const appSlice = createSlice({
    name: "app",
    initialState: {
        isLoading: false,
        messageSuccess: null,
    } as AppState,
    reducers: {}
})

export const {} = appSlice.actions
export const appReducer = appSlice.reducer