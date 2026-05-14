import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import languageReducer from './features/languageSlice';
import surveyReducer from './features/surveySlice';
import authReducer from './features/auth/authSlice';
import { baseApi } from './API/baseAPI';

const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
  survey: surveyReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'language'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
