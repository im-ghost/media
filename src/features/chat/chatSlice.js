import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action) => {
      const { payload } = action;
      state.chats = payload;
    },
  },
});

export const {
  setChats,
} = chatSlice.actions;
export const selectChats = (state) => state.chat.chats;
export default chatSlice.reducer;
