import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import { useDispatch, useSelector } from "react-redux"
import userReducer from '../features/user/userSlice';
import apiSlice from "./api"
import type { TypedUseSelectorHook } from 'react-redux'

import { io } from "socket.io-client"
export const socket:any = io("http://localhost:4000")
export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector