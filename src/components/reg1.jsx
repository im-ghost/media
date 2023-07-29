import { Typography } from '@mui/material';
import * as React from 'react';
import RegButtons from './regbuttons';
import { useNavigate } from 'react-router-dom';
const Reg1 = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center shadow-4xl rounded-[18px]  p-2 w-[80vw] h-[60vh] rounded-lg bg  center flex-col">
      <Typography variant="h4">Welcome</Typography>
      <Typography variant="body2">Let create an account for you</Typography>
      <RegButtons />
      <div
        className="p-2 bgg"
        onClick={() => navigate('/login')}
      >
        <Typography variant="body2"> Already have an account? Login</Typography>
      </div>
    </div>
  );
};
export default Reg1;
