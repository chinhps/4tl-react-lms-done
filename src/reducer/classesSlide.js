import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import branchAPI from '../api/branchAPI';

export const fetchClasses = createAsyncThunk('branch/getBranch', async (params) => {
    const res = await branchAPI.getBranch(params);
    return res;
});

const classesSlide = createSlice({
    name: 'classesSlide',
    initialState: {
        listClasses: [],
    },
    reducers: {},
    extraReducers: {
        [fetchClasses.fulfilled]: (state, action) => {
            state.listClasses = action.payload;
        },
    },
});

export default classesSlide;
