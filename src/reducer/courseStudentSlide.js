import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import coursesAPI from '../api/coursesAPI';

export const joinCourse = createAsyncThunk('courseStudent/coursesAPI', async (id, user) => {
    const res = await coursesAPI.post(id, user);
    return { result: res, id };
});

const courseStudentSlide = createSlice({
    name: 'courseStudentSlide',
    initialState: {
        id: 0,
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
            state.id = action.payload.id;
            state.pending = false;
            state.courseStudent = action.payload.result;
        },
    },
});

export default courseStudentSlide;
