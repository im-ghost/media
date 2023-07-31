import React from 'react';
import { Fab, Box } from '@mui/material';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const Add = ({ isCreatePost = true }) => {
  const navigate = useNavigate();
  return (
    <Box
      style={{
        position: 'fixed',
        bottom: '5em',
        right: '3em',
        zIndex: '9999',
      }}
      className=""
      onClick={() =>
        isCreatePost ? navigate('/createpost') : navigate('/addchat')
      }
    >
      <Fab
        color="primary"
        className="bgg"
      >
        <MdAdd className="text-bold text-3xl bgg" />
      </Fab>
    </Box>
  );
};

export default Add;
