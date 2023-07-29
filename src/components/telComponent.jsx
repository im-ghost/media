import { TextField, InputAdornment } from '@mui/material';
/*
import {
FaPhone,
 } from 'react-icons/fa';*/
export const Phone = ({ value, onChange }) => {
  return (
    <TextField
      id="tel"
      label="Telephone"
       className="bgg"
      placeholder="Telephone"
      InputProps={{
        type: 'tel',
        value: value,
        startAdornment: <InputAdornment position="start">p</InputAdornment>,
        onChange: (e) => {
          onChange({
            type: 'setTel',
            payload: e.target.value,
          });
        },
      }}
    />
  );
};
