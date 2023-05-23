import apiSlice from "../../app/api";
import type { POST, POSTS } from "../../app/types";
//post api
export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<POST, POST>({
      query: (data: POST) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
    }),
    updatePost: builder.mutation<POST, { data: POST; postId: string; userId: string }>({
      query: ({ data, postId, userId }) => ({
        url: `/posts/post/${postId}/${userId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePost: builder.mutation<void, { postId: string; userId: string }>({
      query: ({ postId, userId }) => ({
        url: `/posts/post/${postId}/${userId}`,
        method: "DELETE",
      }),
    }),
    getPostById: builder.query<POST, string>({
      query: (postId) => ({
        url: `/posts/post/${postId}`,
        method: "GET",
      }),
    }),
    allPosts: builder.query<POSTS, null>({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
    }),
    likePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/posts/post/${postId}/like`,
        method: "PUT",
      }),
    }),
    commentPost: builder.mutation<void, { data: string; postId: string }>({
      query: ({ data, postId }) => ({
        url: `/posts/post/${postId}/comment`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLikePostMutation,
  useCommentPostMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetPostByIdQuery,
  useAllPostsQuery,
} = postApiSlice;
