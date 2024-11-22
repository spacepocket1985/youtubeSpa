import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { saveQueriesToLS } from '../../utils/localStorageActions';
import { AppRootState } from '../store';
import { AppActions } from '../types';

const localStorageMiddleware: Middleware<unknown, AppRootState> =
  (store) => (next) => (action) => {
    const result = next(action);

    if (
      (action as PayloadAction<AppActions>).type.startsWith(
        'youtubeVideos/favorite'
      )
    ) {
      const state = store.getState().videoList;
      saveQueriesToLS(state.favorites);
    }

    return result;
  };

export default localStorageMiddleware;
