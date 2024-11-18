import { ActionType as VideoActionType } from './slices/videoSlice';
import { ActionType as AuthActionType } from './slices/authSlice';
import { ActionType as AppActionType } from './slices/appSlice';

export type AppActions = VideoActionType | AuthActionType | AppActionType;
