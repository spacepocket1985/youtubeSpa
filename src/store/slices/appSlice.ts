import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewMode } from '../../components/videos/ListViewMode';

type AppState = {
  loading: boolean;
  error: null | string;
  view: ViewMode;
};

const initialAppState: AppState = {
  loading: false,
  error: null,
  view: ViewMode.List,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.view = action.payload;
    },
  },
});

export const { setLoading, setError, clearError, setViewMode } =
  appSlice.actions;

export type ActionType= typeof appSlice.actions;

export default appSlice.reducer;
