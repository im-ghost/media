import { Paper, Box, Badge, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../app/hooks';
import React, { useEffect, useState } from 'react';

export default function chatListItem({ chat, user }) {
  console.log(chat);
  const { receiver, messages } = chat;
  let [unread, setUnread] = useState(0);
  useEffect(() => {
    if (messages.length > 0) {
      for (let i = 1; i < messages.length; i++) {
        if (messages[messages.length - i].read) {
          break;
        } else {
          setUnread(unread++);
          console.log(unread);
        }
      }
    }
  }, [messages]);
  const navigate = useNavigate();
  return (
    <Paper
      className="bg my-2"
      onClick={() => navigate(`/chats/${chat.id}`)}
    >
      <Box className="flex justify-evenly">
        <img
          src={receiver.image}
          className="rouded-[50%] h-8 w-8"
        />
        <Typography variant="h6">{receiver.name}</Typography>
        <div className="w-[40%]"></div>
      </Box>
      <Box className="bg p-2 flex w-[70%]">
        <Typography variant="body1">
          {messages.length > 0
            ? messages[messages.length - 1].message.substring(0, 15)
            : 'No message yet'}
        </Typography>
        <Typography variant="body2">
          {messages.length > 0
            ? formatDate(messages[messages.length - 1].timestamp)
            : formatDate(Date.now())}
        </Typography>
        <Badge
          badgeContent={unread}
          className="bgg"
        ></Badge>
      </Box>
    </Paper>
  );
}
