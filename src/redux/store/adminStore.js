import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import adminReducer from '../reducers/adminReducer';

// Define which slices of the state you want to persist
const persistConfig = {
    key: 'admin',
    storage,
    whitelist: ['admin']
};

// Wrap the root reducer with the persistConfig object
const persistedAdminReducer = persistReducer(persistConfig, adminReducer);

// Create the store with the persisted reducer
const adminStore = configureStore({
    reducer: {
        admin: persistedAdminReducer,
    },
});

// Create the persistor
const adminPersistor = persistStore(adminStore);

// You can now use the persistor to restore the persisted state to the store
adminPersistor.persist();

export { adminStore, adminPersistor };