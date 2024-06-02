import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import { audioPlayer } from "./reducers/audioPlayer";

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [audioPlayer.name]: audioPlayer.reducer,
    },
});

export default store;

// import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import authSlice from "./reducers/auth";
// import { audioPlayer } from "./reducers/audioPlayer";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from 'redux-persist/lib/storage';

// const rootReducer = combineReducers({
//     [authSlice.name]: authSlice.reducer,
//     [audioPlayer.name]: audioPlayer.reducer,
// });

// const persistConfig = {
//     key: 'root',
//     storage,
//     version: 1,
// };


// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({ serializableCheck: false }),
// })

// export const persistor = persistStore(store);