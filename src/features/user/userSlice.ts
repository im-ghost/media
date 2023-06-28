import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState} from '../../app/store';

import type { USER } from "../../app/types"
type UserState = {
  userSign: any;
  userInfo: null | USER;
  status: 'idle' | 'loading' | 'failed';
}
const userInfoL:string | null = localStorage.getItem("media-user")
const initialState: UserState = {
  userInfo: userInfoL ? JSON.parse(userInfoL).user : null,
  status: 'idle',
  userSign: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state, action: PayloadAction<USER>) => {
    localStorage.setItem("media-user",JSON.stringify(action.payload))
      state.userInfo = action.payload;
      console.log("saved")
      console.log(state.userInfo)
    },
    setUserSign: (state, action: PayloadAction<any>) => {
  
      state.userSign = action.payload;
      console.log("saved")
      console.log(state.userSign)
    }
  },
  
});

export const { setUser,setUserSign } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.userInfo;
export const selectUserSign = (state: RootState) => state.user.userSign;


export default userSlice.reducer;
