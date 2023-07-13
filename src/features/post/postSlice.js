import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: undefined,
  status: 'idle',
  postsObj: undefined,
  comments: undefined,
};
export const postSlice = createSlice({
  name: 'post',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPostsInStore: (state, action) => {
      state.posts = action.payload;
      console.log('saved');
      console.log(state.posts);
    },
    setPostsObjInStore: (state, action) => {
      state.postsObj = action.payload;
    },
    setCommentsInStore: (state, action) => {
      state.comments = action.payload;
    },
    addToStorePosts: (state, action) => {
      const { posts } = state;
      state.posts = posts.push(action.payload);
    },
    updatePosts: (state, action) => {
      const { id } = action.payload;
      const dPost = state.posts.find(
        (post) => post._id.toString() === id.toString(),
      );
      if (dPost) {
        const newPosts = state.posts.filter(
          (post) => post._id.toString() === id.toString(),
        );
        const newPosts2 = newPosts.push(action.payload);
        state.posts = newPosts2;
      }
    },
  },
});
export const {
  setPostsInStore,
  setPostsObjInStore,
  setCommentsInStore,
  addToStorePosts,
  updatePosts,
} = postSlice.actions;
export const selectPosts = (state) => state.post.posts;
export const selectComments = (state) => state.post.comments;
export const selectPostsObj = (state) => state.post.postsObj;
export default postSlice.reducer;
