import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
    name: "mode",
    initialState: {
        mode: "light",
    },
    reducers: {
        toggleMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    }
});

export const { toggleMode } = modeSlice.actions;
export default modeSlice.reducer;
