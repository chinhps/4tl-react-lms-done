import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import branchAPI from '../api/branchAPI';

export const fetchBranches = createAsyncThunk('branch/getBranch', async (params) => {
    const res = await branchAPI.getBranch(params.slug,params.table);
    return res;
});

const branchSlide = createSlice({
    name: 'branchSlide',
    initialState: {
        pending: false,
        listBranches: [],
    },
    reducers: {},
    extraReducers: {
        [fetchBranches.pending]: (state, action) => {
            state.pending = true;
        },
        [fetchBranches.fulfilled]: (state, action) => {
            state.pending = false;
            state.listBranches = action.payload;
        },
    },
});

export default branchSlide;
