import { createSlice } from '@reduxjs/toolkit';

const userInfoL = localStorage.getItem('media-user');
const initialState = {
  userInfo: userInfoL ? JSON.parse(userInfoL).user : null,
  status: 'idle',
  userSign: null,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem('media-user', JSON.stringify(action.payload));
      state.userInfo = action.payload;
      console.log('saved');
      console.log(state.userInfo);
    },
    setUserSign: (state, action) => {
      state.userSign = action.payload;
      console.log('saved');
      console.log(state.userSign);
    },
  },
});
export const { setUser, setUserSign } = userSlice.actions;
export const selectUser = (state) => state.user.userInfo;
export const selectUserSign = (state) => state.user.userSign;
export default userSlice.reducer;
