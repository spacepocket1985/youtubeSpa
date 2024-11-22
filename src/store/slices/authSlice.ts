import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { removeToken, setToken } from '../../utils/localStorageActions';
import { LoginEndpoint, RegEndpoint, User } from '../../service/SwaggerApi';
import { setError, setLoading } from './appSlice';

const initialState = {};

export const login = createAsyncThunk<
  string,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ email, password }, { dispatch, rejectWithValue }) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(LoginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || response.statusText;

      throw new Error(`Error. Login failed. ${errorMessage}`);
    }

    const data = await response.json();

    setToken(data.token);

    return data.token as string;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    dispatch(setError(errorMessage));
    return rejectWithValue(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
});

export const registerUser = createAsyncThunk<
  string,
  User,
  { rejectValue: string }
>('auth/register', async (user, { rejectWithValue, dispatch }) => {
  dispatch(setLoading(true));

  try {
    const response = await fetch(RegEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.errors && Array.isArray(errorData.errors)) {
        const errorMessages = errorData.errors
          .map((err: { msg: unknown }) => err.msg)
          .join(', ');

        throw new Error(
          `Error. Registration failed. ${errorMessages}. Code status - ${response.status}`
        );
      } else {
        const errorMessage = errorData.message || response.statusText;

        throw new Error(
          `Error. Registration failed. ${errorMessage}. Code status - ${response.status}`
        );
      }
    }
    const data = await response.json();
    removeToken();
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    dispatch(setError(errorMessage));
    return rejectWithValue(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export type ActionType = typeof authSlice.actions;

export default authSlice.reducer;
