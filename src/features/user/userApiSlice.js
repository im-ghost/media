import apiSlice from '../../app/api';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ data, userId, token }) => ({
        url: `/users/user/${userId}`,
        method: 'PUT',
        body: data,
        headers: {
          authorization: token,
        },
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ userId, token }) => ({
        url: `/users/user/${userId}`,
        method: 'DELETE',
        headers: {
          authorization: token,
        },
      }),
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `/users/user/${userId}`,
        method: 'GET',
      }),
    }),
    getNotification: builder.query({
      query: ({
        userId, token,
      }) => ({
        url: `/not/n/${userId}`,
        method: 'GET',
        headers: {
          authorization: token,
        },
      }),
    }),
    feeds: builder.query({
      query: (token) => ({
        url: '/users/feeds',
        method: 'GET',
        headers: {
          authorization: token,
        },
      }),
    }),
    createNotification: builder.mutation({
      query: ({
        userId, token, content,
      }) => ({
        url: `/not/n/${userId}`,
        method: 'POST',
        headers: {
          authorization: token,
        },
        body: content,
      }),
    }),
    delNot: builder.mutation({
      query: ({
        userId, token, notificationId,
      }) => ({
        url: `/not/${userId}/${notificationId}`,
        method: 'DELETE',
        headers: {
          authorization: token,
        },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
    allUsers: builder.query({
      query: (token) => ({
        url: '/users',
        method: 'GET',
        headers: {
          authorization: token,
        },
      }),
    }),
    followUser: builder.mutation({
      query: ({ userId, token }) => ({
        url: `/users/user/${userId}/follow`,
        method: 'POST',
        headers: {
          authorization: token,
        },
      }),
    }),
    unfollowUser: builder.mutation({
      query: ({ userId, token }) => ({
        url: `/users/user/${userId}/unfollow`,
        method: 'POST',
        headers: {
          authorization: token,
        },
      }),
    }),
  }),
});
export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useGetNotificationQuery,
  useAllUsersQuery,
  useFeedsQuery,
  useDelNotMutation,
  useCreateNotificationMutation,
} = userApiSlice;
