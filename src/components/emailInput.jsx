import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as React from 'react';
import { emailLink } from '../pages/auth/firebase';
import { setUserSign } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
const EmailInput = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [isButtonDisabled, setButton] = React.useState(false);
  const [isDone, setDone] = React.useState(false);
  const sendLink = async (email) => {
    setButton(true);
    dispatch(setUserSign({ email: email }));
    await emailLink(email);
    setDone(true);
    setTimeout(() => {
      setButton(false);
    }, 10000);
  };
  if (isDone) {
    return (
      <Box className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-40% to-emerald-300 to-100%  dark:from-blue-500 from-20% via-emarald-500 via-30% to-ryan-500 to-100% dark:text-amber-500 text-amber-800 rounded-lg">
        <Typography variant="h6">
          {' '}
          A confirmation link has been sent to your email,click on the link to
          continue
        </Typography>
      </Box>
    );
  }
  return (
    <Box className="bg m-2">
      <TextField
        className="m-2 bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-40% to-emerald-300 to-100%  dark:from-blue-500 from-20% via-emarald-500 via-30% to-ryan-500 to-100% dark:text-amber-900 text-amber-700 rounded-lg"
        label="Email Address"
        placeholder="culestfrosh@gmail.com"
        InputProps={{
          value: email,
          onChange: (e) => setEmail(e.target.value),
        }}
      />
      <button
        onClick={() => sendLink(email)}
        disabled={isButtonDisabled}
        className=" bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-40% to-emerald-300 to-100%  dark:from-blue-500 from-20% via-emarald-500 via-30% to-ryan-500 to-100% dark:text-amber-900 text-amber-700 rounded-lg p-2"
      >
        {' '}
        Send Link{' '}
      </button>
    </Box>
  );
};
export default EmailInput;
