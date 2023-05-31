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
    updatePost: builder.mutation<POST, { data: POST; postId: string; userId: string;token:string }>({
      query: ({ data, postId, userId,token }) => ({
        url: `/posts/post/${postId}/${userId}`,
        method: "PUT",
        body: data,
        headers:{
          authorization:token
        }
      }),
    }),
    deletePost: builder.mutation<void, { postId: string; userId: string;token:string  }>({
      query: ({ postId, userId,token }) => ({
        url: `/posts/post/${postId}/${userId}`,
        method: "DELETE",
        headers:{
          authorization:token
        }
        
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
    likePost: builder.mutation<void, {postId:string;token:string }>({
      query: ({postId,token}) => ({
        url: `/posts/post/${postId}/like`,
        method: "PUT",
        headers:{
          authorization:token
        }
      }),
    }),
    commentPost: builder.mutation<void, { data: string; postId: string;token:string }>({
      query: ({ data, postId ,token}) => ({
        url: `/posts/post/${postId}/comment`,
        method: "PUT",
        body: data,
        headers:{
          authorization:token
        }
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
