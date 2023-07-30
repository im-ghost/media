import { Box, TextField, Button, IconButton } from '@mui/material';
import { FaAd } from 'react-icons/fa';
import React from 'react';

const chatFooter = ({ setValue, value, send }) => {
  return (
    <Box className="flex bgg absolute bottom-0 right-0 left-0 z-[100] mt-4 [margin-top:1em]">
      <TextField
        placeholder="Type your message"
        className="bgg"
        InputProps={{
          value: value,
          onChange: (e) => setValue(e.target.value),
        }}
      />
      <IconButton
        onClick={send}
        className="bgg"
      >
        <FaAd className="bgg" />
      </IconButton>
    </Box>
  );
};

export default chatFooter;
