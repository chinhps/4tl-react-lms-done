import { configureStore } from '@reduxjs/toolkit';
import branchSlide from '../reducer/branchSlide';
import courseStudentSlide from '../reducer/courseStudentSlide';
import userSlide from '../reducer/userSlide';
import quizSlide from '../reducer/quizSlice';

export const store = configureStore({
    reducer: {
        branches: branchSlide.reducer,
        user: userSlide.reducer,
        courseStudent: courseStudentSlide.reducer,
        quiz: quizSlide.reducer,
    },
});
