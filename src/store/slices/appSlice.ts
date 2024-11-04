import { createSlice } from '@reduxjs/toolkit';

type AppState = {
  loading: boolean;
  error: null | string;
};

const initialAppState: AppState = {
  loading: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      if (action.payload) state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setError, clearError } = appSlice.actions;

export default appSlice.reducer;
