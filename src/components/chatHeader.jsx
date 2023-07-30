import React from 'react';
import { Box, Typography } from '@mui/material';
export default function chatHeader({ receiver }) {
  return (
    <Box className="flex bg justify-evenly">
      <img
        className="w-8 h-8 rounded-[50%]"
        src={receiver.image}
      />
      <Typography variant="h6">{receiver.name}</Typography>
      <div className="w-[40%]"></div>
    </Box>
  );
}
