import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;