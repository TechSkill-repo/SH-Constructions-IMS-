import { configureStore } from "@reduxjs/toolkit";
import adminReducer from '../reducers/adminReducer';

export const adminStore = configureStore({
    reducer: {
        admin: adminReducer,
    },
});