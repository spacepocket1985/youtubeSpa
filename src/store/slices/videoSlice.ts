import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, setError } from './appSlice';
import {
  _BaseEndpoint,
  _BaseMaxResults,
  SearchInfo,
  SortOrder,
  VideoItem,
  YouTubeSearchResponse,
} from '../../service/YouTubeApi';

type VideoState = {
  videos: VideoItem[];
  query: string | null;
  pageInfo: SearchInfo;
};

const initialState: VideoState = {
  query: null,
  videos: [],
  pageInfo: {
    totalResults: 0,
    resultsPerPage: 0,
  },
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
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchYouTubeVideos.fulfilled, (state, action) => {
        state.videos = action.payload.items;
        state.pageInfo = action.payload.pageInfo;
      })
      .addCase(fetchYouTubeVideos.rejected, (state) => {
        state.videos = initialState.videos;
        state.pageInfo = initialState.pageInfo;
      });
  },
});

export const { setSearchQuery } = videoSlice.actions;

export default videoSlice.reducer;
