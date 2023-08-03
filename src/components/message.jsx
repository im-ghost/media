import { Paper, Typography } from '@mui/material';
import { formatDate } from '../app/hooks';
import React from 'react';

export default function Message({ message, isUsers }) {
  return (
    <Paper
      className={`p-2 rounded m-2 bg h-auto min-h-12 min-w-12 max-w-24 w-20 ${
        isUsers ? 'justify-self-end' : 'justify-self-start'
      }`}
    >
      <Typography variant="body2">{formatDate(message.timestamp)}</Typography>
      <Typography variant="body1">{message.message}</Typography>
    </Paper>
  );
}
