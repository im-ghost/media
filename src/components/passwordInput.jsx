import { TextField, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { RiEyeFill, RiEyeOffFill, RiLock2Line } from 'react-icons/ri';
export const Password = ({ value, onChange }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <TextField
      id="password"
      label="Password"
      className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-40% to-emerald-300 to-100%  dark:from-blue-500 from-20% via-emarald-500 via-30% to-ryan-500 to-100% dark:text-amber-500 text-amber-800 rounded-lg"
      placeholder="Your password"
      type={passwordVisible ? 'text' : 'password'}
      InputProps={{
        type: passwordVisible ? 'text' : 'password',
        value: value || '',
        startAdornment: (
          <InputAdornment position="end">
            <RiLock2Line />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {passwordVisible ? (
              <RiEyeOffFill onClick={togglePasswordVisibility} />
            ) : (
              <RiEyeFill onClick={togglePasswordVisibility} />
            )}
            }{' '}
          </InputAdornment>
        ),
        onChange: (e) => {
          onChange({
            type: 'setPassword',
            payload: e.target.value,
          });
        },
      }}
    />
  );
};
