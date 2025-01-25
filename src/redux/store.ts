// @ts-ignore
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import themeSlice from './slices/themeSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    theme: themeSlice,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
