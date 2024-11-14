import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import videoReducer from './slices/videoSlice';
import appReducer from './slices/appSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  videoList: videoReducer,
  app: appReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
