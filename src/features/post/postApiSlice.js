import apiSlice from '../../app/api';
// post api
export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: ({
        data, token,
      }) => ({
        url: '/posts',
        method: 'POST',
        body: data,
        headers: {
          authorization: token,
        },
      }),
    }),
    updatePost: builder.mutation({
      query: ({
        data, postId, userId, token,
      }) => ({
        url: `/posts/post/${postId}/${userId}`,
        method: 'PUT',
        body: data,
        headers: {
          authorization: token,
        },
      }),
    }),
    deletePost: builder.mutation({
      query: ({
        postId, userId, token,
      }) => ({
        url: `/posts/post/${postId}/${userId}`,
        method: 'DELETE',
        headers: {
          authorization: token,
        },
      }),
    }),
    getPostById: builder.query({
      query: (postId) => ({
        url: `/posts/post/${postId}`,
        method: 'GET',
      }),
    }),
    allPosts: builder.query({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
    }),
    likePost: builder.mutation({
      query: ({
        postId, token,
      }) => ({
        url: `/posts/post/like/${postId}/`,
        method: 'PUT',
        headers: {
          authorization: token,
        },
      }),
    }),
    commentOnPost: builder.mutation({
      query: ({
        data, postId, token,
      }) => ({
        url: `/posts/post/comment/${postId}/`,
        method: 'PUT',
        body: data,
        headers: {
          authorization: token,
        },
      }),
    }),
    retweetPost: builder.mutation({
      query: ({
        postId, token,
      }) => ({
        url: `/posts/post/retweet/${postId}/`,
        method: 'PUT',
        body: postId,
        headers: {
          authorization: token,
        },
      }),
    }),
  }),
});
export const {
  useLikePostMutation,
  useRetweetPostMutation,
  useCommentOnPostMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetPostByIdQuery,
  useAllPostsQuery,
} = postApiSlice;
