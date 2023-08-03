import { Typography } from '@mui/material';
import React from 'react';
const Loader = ({ isPage }) => {
  return (
    <div className={isPage ? 'page' : ''}>
      <Typography variant="h1">Loading...</Typography>
    </div>
  );
};

export default Loader;
