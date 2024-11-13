import { createSelector } from '@reduxjs/toolkit';
import { AppRootState } from '../store';

export const selectViewMode = createSelector(
  (state: AppRootState) => state.app.view,
  (view) => view
);
