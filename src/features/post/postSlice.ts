import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState} from '../../app/store';

import type { POST } from "../../app/types"
type PostState = {
  posts: { post : POST}[] | null
  status: 'idle' | 'loading' | 'failed';
}
const initialState: PostState = {
  posts : null,
  status: 'idle',
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPostsInStore: (state, action: PayloadAction<{ post : POST}[]>) => {
  
      state.posts = action.payload;
      console.log("saved")
      console.log(state.posts)
    }
  },
  
});

export const { setPostsInStore } = postSlice.actions;

export const selectPosts = (state: RootState) => state.post.posts;


export default postSlice.reducer;
