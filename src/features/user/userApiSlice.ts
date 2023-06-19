import apiSlice from "../../app/api";
import type { USER } from "../../app/types";


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<USER, {email:string,password:string}>({
      query: ({email, password}) => ({
        url: "/users/login",
        method: "POST",
        body: {email, password},
      }),
    }),
    registerUser: builder.mutation<USER, USER >({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation<USER, { data: USER; userId: string;token:string  }>({
      query: ({ data, userId,token }) => ({
        url: `/users/user/${userId}`,
        method: "PUT",
        body: data,
        headers:{
          authorization:token
        }
      }),
    }),
    deleteUser: builder.mutation<void, {token:string;userId: string}>({
      query: ({userId,token}) => ({
        url: `/users/user/${userId}`,
        method: "DELETE",
        headers:{
          authorization:token
        }
      }),
    }),
    getUserById: builder.query<{user :USER},{userId:string;token:string}>({
      query: ({userId,token}) => ({
        url: `/users/user/${userId}`,
        method: "GET",
        headers:{
          authorization:token
        }
      }),
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST"
      }),
    }),
    allUsers: builder.query<{users:USER[]}, string | undefined>({
      query: (token) => ({
        url: "/users",
        method: "GET", 
        headers:{
          authorization:token
        }
      }),
    }),
    followUser: builder.mutation<void, {userId: string,token: string}>({
      query: ({userId,token}) => ({
        url: `/users/user/${userId}/follow`,
        method: "POST",
        headers:{
          authorization:token
        }
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
