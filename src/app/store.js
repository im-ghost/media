import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import userReducer from '../features/user/userSlice';
import postReducer from '../features/post/postSlice';
import * as chatReducer from '../features/chat/chatSlice';
import apiSlice from './api';

export const socket = io('https://media-app-api-a06z.onrender.com/');
export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    chat: chatReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
