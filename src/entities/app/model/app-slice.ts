import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type AppState = {
    isLoading: boolean,
    messageSuccess: null | string,
    error: null | string,
}

export const appSlice = createSlice({
    name: "app",
    initialState: {
        isLoading: false,
        messageSuccess: null,
    } as AppState,
    reducers: {
        setMessage(state, action: PayloadAction<{ messageSuccess: string | null }>) {
            state.messageSuccess = action.payload.messageSuccess;
        },
        setError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        }
    }
})

export const { setMessage,setError} = appSlice.actions
export const appReducer = appSlice.reducer