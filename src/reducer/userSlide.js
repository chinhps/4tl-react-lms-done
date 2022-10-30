import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../api/userAPI';

export const fetchUser = createAsyncThunk('user/getUser', async () => {
    const res = await userAPI.getme();
    return res;
});

const userSlide = createSlice({
    name: 'userSlide',
    initialState: {
        user: {},
    },
    reducers: {},
    extraReducers: {
        [fetchUser.fulfilled]: (state, action) => {
            state.user = action.payload;
        },
    },
});

export default userSlide;
