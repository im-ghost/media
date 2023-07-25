import apiSlice from '../../app/api';
// chay api
export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: ({ data, token }) => ({
        url: '/chat',
        method: 'POST',
        body: data,
        headers: {
          authorization: token,
        },
      }),
    }),
    deleteChat: builder.mutation({
      query: ({ chatId, token }) => ({
        url: `/chat/${chatId}/`,
        method: 'DELETE',
        headers: {
          authorization: token,
        },
      }),
    }),
    getChatById: builder.query({
      query: ({ id, token }) => ({
        url: `/chat/${id}`,
        method: 'GET',
        headers: {
          authorization: token,
        },
      }),
    }),
    allChats: builder.query({
      query: ({ token, userId }) => ({
        url: `/chat/user/${userId}`,
        method: 'GET',
        headers: {
          authorization: token,
        },
      }),
    }),
  }),
});
export const {
  useCreateChatMutation,
  useDeleteChatMutation,
  useGetChatByIdQuery,
  useAllChatsQuery,
} = chatApiSlice;
