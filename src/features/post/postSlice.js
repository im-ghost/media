import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    posts: null,
    status: 'idle',
};
export const postSlice = createSlice({
    name: 'post',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setPostsInStore: (state, action) => {
            state.posts = action.payload;
            console.log("saved");
            console.log(state.posts);
        }
    },
});
export const { setPostsInStore } = postSlice.actions;
export const selectPosts = (state) => state.post.posts;
export default postSlice.reducer;
