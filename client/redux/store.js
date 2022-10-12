import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
//redux toolkit boilerplate
export const store = configureStore({
  reducer: {
    setUser: userSlice,
  },
});