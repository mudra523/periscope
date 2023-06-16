import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from './authSlice';
import activate from './activateSlice';
import roomModal from './roomModalSlice';

const persistConfig = {
  key: "root",
  version: 1,
  storage,
}

const reducer = combineReducers({
  auth,
  activate,
  roomModal,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})