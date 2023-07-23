import { Box, TextField, Button, IconButton } from '@mui/material';
import { FaAd } from 'react-icons/fa';
import React from 'react';

const chatFooter = ({ setValue, value, send }) => {
  return (
    <Box className="flex">
      <TextField
        placeholder="Type your message"
        InputProps={{
          value: value,
          onChange: (e) => setValue(e.target.value),
        }}
      />
      <IconButton onClick={send}>
        <FaAd />
      </IconButton>
    </Box>
  );
};

export default chatFooter;
