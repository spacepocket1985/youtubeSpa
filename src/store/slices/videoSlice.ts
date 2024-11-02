import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  _BaseEndpoint,
  _BaseMaxResults,
  VideoItem,
  YouTubeSearchResponse,
} from '../../service/YouTubeApi';

type VideoState = {
  loading: boolean;
  error: null | string;
  videos: VideoItem[];
};

const initialState: VideoState = {
  loading: false,
  error: null,
  videos: [],
};

export const fetchYouTubeVideos = createAsyncThunk<
  YouTubeSearchResponse,
  { query: string; maxResults?: string },
  { rejectValue: string }
>(
  'youtubeVideos/search',
  async ({ query, maxResults = _BaseMaxResults }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${_BaseEndpoint}&q=${query}&maxResults=${maxResults}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
      );

      if (!response.ok) {
        return rejectWithValue('Network response was not ok');
      }

      const data: YouTubeSearchResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(`Error. Login failed. ${error.message}`);
      }
      return rejectWithValue('Unknown error occurred');
    }
  }
);

const videoSlice = createSlice({
  name: 'youtubeVideos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchYouTubeVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchYouTubeVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.items;
      })
      .addCase(fetchYouTubeVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { actions } = videoSlice;

export default videoSlice.reducer;
