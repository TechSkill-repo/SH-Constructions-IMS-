import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import centralReducer from "../reducers/centralReducer";

// Define which slices of the state you want to persist
const persistConfig = {
    key: 'central',
    storage,
    whitelist: ['central']
};

// Wrap the root reducer with the persistConfig object
const persistedCentralReducer = persistReducer(persistConfig, centralReducer);

// Create the store with the persisted reducer
const centralStore = configureStore({
    reducer: {
        central: persistedCentralReducer,
    },
});

// Create the persistor
const centralPersistor = persistStore(centralStore);

// You can now use the persistor to restore the persisted state to the store
centralPersistor.persist();

export { centralStore, centralPersistor };