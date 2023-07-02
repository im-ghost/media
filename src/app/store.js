import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from "react-redux";
import userReducer from '../features/user/userSlice';
import postReducer from '../features/post/postSlice';
import apiSlice from "./api";
import { io } from "socket.io-client";
export const socket = io("http://localhost:4000");
export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
