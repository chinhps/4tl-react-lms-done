import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../api/userAPI';

export const fetchUser = createAsyncThunk('user/getUser', async () => {
  const res = await userAPI.getme();
  return res;
});

export const fetchLogin = createAsyncThunk('user/login', async (params) => {
  const dataLogin = await userAPI.login({
    email: params.email,
    password: params.password,
  });
  return dataLogin;
});

const userSlide = createSlice({
  name: 'userSlide',
  initialState: {
    pending: false,
    error: false,
    errors: null,
    user: null,
  },
  reducers: {},
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchLogin.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = false;
      state.user = action.payload;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = false;
      state.user = action.payload.msg;
    },
  },
});

export default userSlide;
