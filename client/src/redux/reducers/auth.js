import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signUpSuccess: (state, action) => {
            state.user = action.payload;
        },
        signUpFailure: (state) => {
            state.user = null;
        },
        logout: (state) => {
            state.user = null;
        },
        updateSuccess: (state, action) => {
            state.user = action.payload;
        },
        updateFailure: (state) => {
            state.user = null;
        },
    },
});

export default authSlice;
export const { signUpSuccess, signUpFailure, logout, updateSuccess, updateFailure } = authSlice.actions;