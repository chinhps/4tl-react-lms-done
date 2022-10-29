import { configureStore } from '@reduxjs/toolkit';
import classesSlide from '../reducer/classesSlide';

export const store = configureStore({
    reducer: {
        classes: classesSlide.reducer,
    },
});
