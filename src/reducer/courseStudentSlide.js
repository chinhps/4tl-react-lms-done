import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import courseStudentAPI from '../api/courseStudentAPI';

export const joinCourse = createAsyncThunk('courseStudent/getCourseStudent', async (id, user) => {
    const res = await courseStudentAPI.post(id, user);
    return res;
});

const courseStudentSlide = createSlice({
    name: 'courseStudentSlide',
    initialState: {
        pending: true,
        error: false,
        courseStudent: {},
    },
    reducers: {},
    extraReducers: {
        [joinCourse.pending]: (state) => {
            state.pending = true;
        },
        [joinCourse.rejected]: (state) => {
            state.pending = false;
            state.error = true;
        },
        [joinCourse.fulfilled]: (state, action) => {
            state.pending = false;
            state.courseStudent = action.payload;
        },
    },
});

export default courseStudentSlide;
