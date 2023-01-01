import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import siteReducer from "../reducers/siteReducer";

// Define which slices of the state you want to persist
const persistConfig = {
    key: 'site',
    storage,
    whitelist: ['site']
};

// Wrap the root reducer with the persistConfig object
const persistedSiteReducer = persistReducer(persistConfig, siteReducer);

// Create the store with the persisted reducer
const siteStore = configureStore({
    reducer: {
        site: persistedSiteReducer,
    },
});

// Create the persistor
const sitePersistor = persistStore(siteStore);

// You can now use the persistor to restore the persisted state to the store
sitePersistor.persist();

export { siteStore, sitePersistor };