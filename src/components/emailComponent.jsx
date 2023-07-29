import { TextField, InputAdornment } from '@mui/material';
import * as React from 'react';
import { FaEnvelope } from 'react-icons/fa';
export const Email = ({ value, onChange }) => {
  return (
    <TextField
      id="email"
      label="Email Address"
      placeholder="medi@medi.com"
      className=" bg rounded-xl"
      InputProps={{
        type: 'email',
        value: value,
        startAdornment: (
          <InputAdornment position="start">
            <FaEnvelope />
          </InputAdornment>
        ),
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
