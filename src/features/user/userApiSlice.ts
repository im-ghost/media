import apiSlice from "../../app/api";
import type { USER } from "../../app/types";


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<USER, { data: USER }>({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),
    registerUser: builder.mutation<USER, { data: USER }>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation<USER, { data: USER; userId: string }>({
      query: ({ data, userId }) => ({
        url: `/users/user/${userId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation<void, {userId:string}>({
      query: (userId) => ({
        url: `/users/user/${userId}`,
        method: "DELETE",
      }),
    }),
    getUserById: builder.query<USER,{userId:string}>({
      query: (userId) => ({
        url: `/users/user/${userId}`,
        method: "GET",
      }),
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST"
      }),
    }),
    allUsers: builder.query<USER[], null>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    followUser: builder.mutation<void, {userId: string}>({
      query: (userId) => ({
        url: `/users/user/${userId}/follow`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useFollowUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useAllUsersQuery,
} = userApiSlice;