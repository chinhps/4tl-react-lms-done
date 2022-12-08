import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import labAPI from '../api/labAPI';

export const fetchLab = createAsyncThunk('lab/getLab', async (data) => {
  const res = await labAPI.getAll(data.slugCourse, data.slug, data.password);
  return res;
});

const labSlice = createSlice({
  name: 'labSlice',
  initialState: {
    pending: false,
    error: false,
    errors: null,
    lab: null,
  },
  reducers: {},
  extraReducers: {
    [fetchLab.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchLab.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
    [fetchLab.fulfilled]: (state,action) => {
      state.pending = false;
      state.error = false;
      state.lab = action.payload
    },
  },
});

export default labSlice;
