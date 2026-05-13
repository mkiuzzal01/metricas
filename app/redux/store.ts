import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './features/languageSlice';
import surveyReducer from './features/surveySlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    survey: surveyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
