import { useParams, useNavigate } from 'react-router';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useGetChatByIdQuery } from '../features/chat/chatApiSlice';
import { selectUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';

import Messages from '../components/messages';
import ChatHeader from '../components/chatHeader';
import ChatFooter from '../components/chatFooter';
import React, { useEffect, useState } from 'react';
import { socket } from '../app/store';
import { toast } from 'react-toastify';
const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [messages, setMessages] = useState();
  const [chatId, setChatId] = useState();
  const [value, setValue] = useState("");
  const [receiver, setReceiver] = useState();
  const { data, error } = useGetChatByIdQuery({
    id,
    token:user.token,
  });
  const send = async () => {
    console.log(chatId);
    if (chatId) {
      socket.emit('sendMessage', {
        userId: user._id,
        chatId: chatId,
        message: value,
      });
    }
  };
  useEffect(() => {
    if (chatId) {
      socket.on(`chatmessage-${chatId}`, (chat) => {
        console.log(chat);
        setMessages(chat);
      });
    }
  }, [chatId]);
  useEffect(() => {
    if (data) {
      setReceiver(data.chat.receiver);
      setMessages(data.chat.messages);
      setChatId(data.chat.id);
      console.log(data);
    } 
    if(error){
      toast.error(JSON.stringify(error));
      navigate(-1);
    }
  }, [data, error]);
  if (messages && receiver && user) {
    return (
      <>
        <Helmet>
          <title>Your chat with {receiver.name}</title>
        </Helmet>
        <Box className="bg">
          <ChatHeader receiver={receiver} />
          <Messages
            messages={messages}
            user={user}
          />
          <ChatFooter
            send={send}
            value={value}
            setValue={setValue}
          />
        </Box>
      </>
    );
  }
};

export default Chat;
