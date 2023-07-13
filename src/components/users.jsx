import User from './user';
import React from 'react';
import { Box } from '@mui/material';
const Users = ({ users }) => {
  return (
    <Box className="">
      {users.map((user) => (
        <User userId={user} />
      ))}
    </Box>
  );
};
export default Users;
