import { Typography } from '@mui/material';
import * as React from 'react';
import RegButtons from './regbuttons';
import { useNavigate } from 'react-router-dom';
const Reg1 = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center shadow-4xl rounded-[18px]  p-2 w-[80vw] h-[60vh] rounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-40% to-emerald-500 to-100%  dark:from-blue-700 dark:from-20% dark:via-emarald-700 dark:via-30% dark:to-ryan-700 dark:to-100% dark:text-amber-500 text-amber-800  flex flex-col justify-evenly items-center  backdrop-blur-3xl [backdrop-filter: blur(30px)]">
      <Typography variant="h4">Welcome</Typography>
      <Typography variant="body2">Let create an account for you</Typography>
      <RegButtons />
      <div
        className="p-2 dark:text-amber-500 text-amber-800 "
        onClick={() => navigate('/login')}
      >
        <Typography variant="body2"> Already have an account? Login</Typography>
      </div>
    </div>
  );
};
export default Reg1;
