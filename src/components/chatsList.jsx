import { Container } from '@mui/material';
import { useAllChatsQuery } from '../features/chat/chatApiSlice';
import ChatListItem from './chatListItem';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
const ChatsList = ({ user }) => {
  const [chats, setChats] = useState();
  const { data, error } = useAllChatsQuery({
    token: user.token,
    userId: user._id,
  });
  useEffect(() => {
    if (data) {
      console.log(data);
      setChats(data.chats);
    }
    if (error) {
      toast.error(JSON.stringify(error));
    }
  }, [data, error]);
  if (chats) {
    return (
      <Container className="bg bg min-h-full h-auto w-screen">
        {chats.map((chat) => (
          <ChatListItem
            chat={chat}
            user={user}
          />
        ))}
      </Container>
    );
  }
  return;
};

export default ChatsList;
