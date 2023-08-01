import { Typography, Button, Paper, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import { useCreateChatMutation } from '../features/chat/chatApiSlice';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Chat({ user }) {
  const [createChat, { data: chat, error: chatError }] =
    useCreateChatMutation();
  const [disabled, setDisabled] = React.useState(false);
  const userFromStore = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (chat) {
      navigate(`/chats/${chat.chat._id}`);
    }
    if (chatError) {
      setDisabled(false);
      toast.error(JSON.stringify(chatError.data.message));
    }
  }, [chat, chatError]);
  const create = async () => {
    setDisabled(true);
    await createChat({
      data: {
        receiver: user._id,
      },
      token: userFromStore.token,
    });
  };
  return (
    <Paper className="bg flex justify-evenly m-2 p-2 w-[90vw]">
      <Box
        className="flex flex-grow-2"
        onClick={() => navigate(`/users/${user._id}`)}
      >
        <img
          src={user.image}
          alt={user.name}
          className="h-6 w-auto"
        />
        <Typography variant="body1">{user.name}</Typography>
      </Box>
      <Button
        onClick={create}
        disabled={disabled}
      >
        Message
      </Button>
    </Paper>
  );
}
