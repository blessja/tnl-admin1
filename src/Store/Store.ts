import { configureStore } from '@reduxjs/toolkit';
import { api } from './apiSlice'; // Import your api slice
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // Add RTK Query's reducer
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Add RTK Query's middleware
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
