import {
  Box,
  Typography
} from '@mui/material';
import React from 'react';

export default function Message({ message }) {
  return (
    <Box
      className={`p-2 rounded m-2 bg ${
        message.direction === 'outgoing' ? 'justify-self-start' : 'justify-self-end'
      }`}
    >
      <Typography variant="body2">{message.timestamp}</Typography>
      <Typography variant="body1">{message.message}</Typography>
    </Box>
  );
}
