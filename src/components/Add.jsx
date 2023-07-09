import React from 'react';
import { Fab,Box } from '@mui/material';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from "react-router-dom"
const Add = () => {
  const navigate= useNavigate()
  return (
    <Box
      style={{
        position: 'fixed',
        bottom: '5em',
        right: '3em',
        zIndex: '9999', 
      }}
      className=""
      onClick={()=>navigate("/createpost")}
    >
<Fab color="primary">
  <MdAdd className="text-bold text-3xl" />
</Fab>
    </Box>
  );
};

export default Add;

