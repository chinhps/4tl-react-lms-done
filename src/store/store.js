import { configureStore } from '@reduxjs/toolkit';
import classesSlide from '../reducer/classesSlide';
import courseStudentSlide from '../reducer/courseStudentSlide';
import userSlide from '../reducer/userSlide';

export const store = configureStore({
    reducer: {
        classes: classesSlide.reducer,
        user: userSlide.reducer,
        courseStudent: courseStudentSlide.reducer,
    },
});
