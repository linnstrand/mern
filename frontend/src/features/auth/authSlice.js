import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// I would probably have preferred to use an Enum for state rather then 3 different states.
const initialState = {
  user: user ? user : null,
  status: null,
  message: '',
};

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// This is too many states. Only one is needed at the time so this just makes things complex.
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous
    reset: (state) => {
      state.status = null;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    // asynchronous
    builder
      .addCase(register.pending, (state) => {
        state.status = 'isLoading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'isSuccess';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'isError';
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.status = 'isLoading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'isSuccess';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'isError';
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
