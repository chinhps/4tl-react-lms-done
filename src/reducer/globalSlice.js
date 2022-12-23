import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: {
    workSomeThing: false,
  },
  reducers: {
    toggleWorkSomething: (state, action) => {
      state.workSomeThing = action.payload;
    },
  },
});

export const { toggleWorkSomething } = globalSlice.actions;

export default globalSlice;
