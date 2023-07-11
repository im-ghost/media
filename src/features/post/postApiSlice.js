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
    updateComment: builder.mutation({
      query: ({
        content, commentId, token,
      }) => ({
        url: `/posts/comments/${commentId}`,
        method: 'PUT',
        body: content,
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
    deleteComment: builder.mutation({
      query: ({
        commentId, token,
      }) => ({
        url: `/posts/comments/${commentId}`,
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
    getCommentById: builder.query({
      query: (commentId) => ({
        url: `/posts/comments/${commentId}`,
        method: 'GET',
      }),
    }),
    allPosts: builder.query({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
    }),
  }),
});
export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useDeleteCommentMutation,
  useUpdatePostMutation,
  useUpdateCommentMutation,
  useGetPostByIdQuery,
  useAllPostsQuery,
  useGetCommentByIdQuery,
} = postApiSlice;
