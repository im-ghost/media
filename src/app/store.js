import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import userReducer from '../features/user/userSlice';
import postReducer from '../features/post/postSlice';
import chatReducer from '../features/chat/chatSlice';
import apiSlice from './api';

export const socket = io('http://localhost:4000');
export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    chat: chatReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
