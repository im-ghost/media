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
      className="bg rounded-lg"
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
