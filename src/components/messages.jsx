import { Box } from '@mui/material';
import React from 'react';
import Message from './message';
const Messages = ({ messages, user }) => {
  return (
    <Box className="bg flex flex-col">
      {messages.map((message) => (
        <Message
          message={message}
          isUsers={message.sender === user._id}
        />
      ))}
    </Box>
  );
};
export default Messages;
