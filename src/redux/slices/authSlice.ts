import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "../../types/interfaces";

const initialState: AuthState = {
    email: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ email: string }>) => {
            state.email = action.payload.email;
        },
        logout: (state) => {
            state.email = null;
        },
    },
});

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;
