import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dataService from './dataService';

const initialState = {
  data: [],
  status: null,
  message: '',
};

// Create new data
export const createData = createAsyncThunk(
  'data/create',
  async (dataData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await dataService.createData(dataData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user data
export const getData = createAsyncThunk('data/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await dataService.getData(token);
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete user data
export const deleteData = createAsyncThunk(
  'data/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await dataService.deleteData(id, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createData.pending, (state) => {
        state.status = 'isLoading';
      })
      .addCase(createData.fulfilled, (state, action) => {
        state.status = 'isSuccess';
        state.data.push(action.payload);
      })
      .addCase(createData.rejected, (state, action) => {
        state.status = 'isError';
        state.message = action.payload;
      })
      .addCase(getData.pending, (state) => {
        state.status = 'isLoading';
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = 'isSuccess';
        state.data = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        state.status = 'isError';
        state.message = action.payload;
      })
      .addCase(deleteData.pending, (state) => {
        state.status = 'isLoading';
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.status = 'isSuccess';
        state.data = state.data.filter(
          (data) => data._id !== action.payload.id
        );
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.status = 'isError';
        state.message = action.payload;
      });
  },
});

export const { reset } = dataSlice.actions;
export default dataSlice.reducer;
