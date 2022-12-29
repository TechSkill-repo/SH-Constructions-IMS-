import { configureStore } from "@reduxjs/toolkit";
import siteReducer from "../reducers/siteReducer";

export const siteStore = configureStore({
    reducer: {
        site: siteReducer,
    },
});