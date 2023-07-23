import { Paper, Box, Badge, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function chatListItem({ chat, user }) {
  const { reciever, messages } = chat;
  const unread = 0;
  useEffect(() => {
    for (let i = 1; i < messages.length; i++) {
      if (messages[messages.length - i].read) {
        break;
      } else {
        unread++;
      }
    }
  }, [messages]);
  const navigate = useNavigate();
  return (
    <Paper className="">
      <img
        src={reciever.image}
        className="rouded-[50%] h-8 w-8"
      />
      <Box className="">
        <Typography variant="h6">{reciever.name}</Typography>
        <Typography variant="body1">{messages[0].message}</Typography>
      </Box>
      <Box className="">
        <Typography variant="body2">{messages[0].timestamp}</Typography>
        <Badge badgeContent={unread}></Badge>
      </Box>
    </Paper>
  );
}
