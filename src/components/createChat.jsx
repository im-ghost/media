import { Typography, Button, Paper, Box } from "@mui/material"

import { useCreateChatMutation } from '../features/chat/chatApiSlice';
import React, { useEffect, useState } from 'react';
import { useNavigate,  Link } from 'react-router-dom';
import { toast } from "react-toastify";
export default function Chat(argument) {
  
  const [createChat, { data: chat, error: chatError }] =
    useCreateChatMutation();
    useEffect(() => {
    if (chat) {
      navigate(`/chats/${chat.chat._id}`);
    }
    if (chatError) {
      toast.error(JSON.stringify(chatError.data.message));
    }
  }, [chat, chatError]);
  const create = async () => {
    await createChat({
      data: {
        receiver: user._id,
      },
      token: userFromStore.token,
    });
  };
    return (
      <Paper className="bg flex justify-evenly">
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
          disable={disable}
          onClick={create}
        >
          Message
        </Button>
      </Paper>
    );
}