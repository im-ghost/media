import User from './user';
import React from 'react';
import { Box } from '@mui/material';
const Users = ({ users }) => {
  return (
    <Box className="bg">
      {users.map((user) => (
        <User userId={typeof user === 'object' ? user._id : user} />
      ))}
    </Box>
  );
};
export default Users;
