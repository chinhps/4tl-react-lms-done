import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import quizAPI from '../api/quizAPI';

export const fetchQuiz = createAsyncThunk('quiz/getQuiz', async (data) => {
  const res = await quizAPI.getAll(data.slugCourse, data.slug, data.password);
  return res;
});

const quizSlice = createSlice({
  name: 'quizSlice',
  initialState: {
    pending: false,
    error: false,
    errors: null,
    quiz: null,
  },
  reducers: {},
  extraReducers: {
    [fetchQuiz.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchQuiz.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
    [fetchQuiz.fulfilled]: (state,action) => {
      state.pending = false;
      state.error = false;
      state.quiz = action.payload
    },
  },
});

export default quizSlice;
