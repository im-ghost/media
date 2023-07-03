import { TextField, InputAdornment } from '@mui/material';
/*
import {
FaEnvelope,
} from 'react-icons/fa';*/
export const Email = ({ value, onChange }) => {
  return (
    <TextField
      id="email"
      label="Email Address"
      placeholder="medi@medi.com"
      className=" bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-40% to-emerald-300 to-100%  dark:from-blue-500 from-20% via-emarald-500 via-30% to-ryan-500 to-100% dark:text-amber-500 text-amber-800  rounded-xl"
      InputProps={{
        type: 'email',
        value: value,
        startAdornment: <InputAdornment position="start">E</InputAdornment>,
        onChange: (e) => {
          onChange({
            type: 'setEmail',
            payload: e.target.value,
          });
        },
      }}
    />
  );
};
