import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "../../types/interfaces";

const initialState: AuthState = {
    email: null,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{email: string}>) => {
            state.email = action.payload.email;
            state.isLoading = false;
        },
        logout: (state) => {
            state.email = null;
            localStorage.removeItem("email");
           // localStorage.removeItem("token");
        },
        finishLoading: (state) => {
            state.isLoading = false;
        },
    },
});

export const {setUser, logout, finishLoading} = authSlice.actions;
export default authSlice.reducer;
