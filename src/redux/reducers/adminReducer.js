import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    elements: [],
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        remove: (state,{payload}) => {
            state.elements = state.elements.filter((element, index) => index !== payload);
        },
        add: (state, { payload }) => {
            const text = payload;
            state.elements.push(text);
        },
    }
});

export const { remove, add } = adminSlice.actions;

export default adminSlice.reducer;