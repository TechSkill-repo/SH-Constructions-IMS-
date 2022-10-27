import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    elements: [],
};

const siteSlice = createSlice({
    name: 'site',
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

export const { remove, add } = siteSlice.actions;

export default siteSlice.reducer;