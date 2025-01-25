// @ts-ignore
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

const rootReducer = combineReducers({
    auth: authSlice,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
