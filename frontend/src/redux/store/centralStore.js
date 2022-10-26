import { configureStore } from "@reduxjs/toolkit";
import centralReducer from "../reducers/centralReducer";

export const centralStore = configureStore({
    reducer: {
        central: centralReducer,
    },
});