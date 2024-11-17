import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setLoading, setError } from './appSlice';
import {
  _BaseEndpoint,
  _BaseMaxResults,
  SearchInfo,
  SortOrder,
  VideoItem,
  YouTubeSearchResponse,
} from '../../service/YouTubeApi';
import { FavoriteItemType } from '../../pages/Favorites';
import { getQueriesFromLS } from '../../utils/localStorageActions';

type VideoState = {
  videos: VideoItem[];
  query: string | null;
  pageInfo: SearchInfo;
  favorites: FavoriteItemType[];
};

const initialState: VideoState = {
  query: null,
  videos: [],
  pageInfo: {
    totalResults: 0,
    resultsPerPage: 0,
  },
  favorites: getQueriesFromLS(),
};

export const fetchYouTubeVideos = createAsyncThunk<
  YouTubeSearchResponse,
  { query: string; maxResults?: string; order?: SortOrder },
  { rejectValue: string }
>(
  'youtubeVideos/search',
  async (
    { query, maxResults = _BaseMaxResults, order = SortOrder.Relevance },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(setLoading(true));

    try {
      const response = await fetch(
        `${_BaseEndpoint}&q=${query}&maxResults=${maxResults}&order=${order}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: YouTubeSearchResponse = await response.json();
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const videoSlice = createSlice({
  name: 'youtubeVideos',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    favoriteItemAdd: (state, action: PayloadAction<FavoriteItemType>) => {
      state.favorites.unshift(action.payload);
    },
    favoriteItemUpdate: (state, action: PayloadAction<FavoriteItemType>) => {
      const itemIndex = state.favorites.findIndex(
        (item) => item.id! === action.payload.id!
      );
      state.favorites[itemIndex] = action.payload;
    },
    favoriteItemDelete: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (item) => item.id! !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchYouTubeVideos.fulfilled,
        (state, action: PayloadAction<YouTubeSearchResponse>) => {
          state.videos = action.payload.items;
          state.pageInfo = action.payload.pageInfo;
        }
      )
      .addCase(fetchYouTubeVideos.rejected, (state) => {
        state.videos = initialState.videos;
        state.pageInfo = initialState.pageInfo;
      });
  },
});

export const {
  setSearchQuery,
  favoriteItemAdd,
  favoriteItemDelete,
  favoriteItemUpdate,
} = videoSlice.actions;

export type ActionType = typeof videoSlice.actions; 

export default videoSlice.reducer;
