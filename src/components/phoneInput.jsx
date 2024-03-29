import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as React from 'react';
import { phone, verifyPhone } from '../pages/auth/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUserSign } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
const PhoneNumberInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [num, setNum] = React.useState('');
  const [result, setResult] = React.useState();
  const [codeInput, setCodeInput] = React.useState(false);
  const [isButtonDisabled, setButton] = React.useState(false);
  const [code, setCode] = React.useState('');
  const sendCode = async (num) => {
    setButton(true);
    const confirmationResult = await phone(num);
    setResult(confirmationResult);
    setCodeInput(true);
    setTimeout(() => {
      setButton(false);
    }, 10000);
  };
  const verify = async (code) => {
    setButton(true);
    const res = await verifyPhone(num, code, result);
    if (typeof res === 'string') {
      await dispatch(setUserSign({ num: num }));
      navigate('/register2');
    } else {
      toast.error(JSON.stringify(res));
      setCodeInput(false);
    }
    setTimeout(() => {
      setButton(false);
    }, 10000);
  };
  if (codeInput) {
    return (
      <Box className="bg m-2 rounded-lg">
        <div id="recaptcha-container"></div>
        <Typography variant="h6">
          A code has been sent to {num} , input the code below to continue with
          your registration
        </Typography>

        <TextField
          label="Code"
          className="m-2 bg rounded-lg"
          placeholder="Input the OTP sent"
          InputProps={{
            value: code,
            onChange: (e) => setCode(e.target.value),
          }}
        />
        <button
          className="bg rounded-lg"
          onClick={() => verify(code)}
          disabled={isButtonDisabled}
        >
          {' '}
          Verify{' '}
        </button>
      </Box>
    );
  }
  return (
    <Box className="bg rounded-lg">
      <div id="recaptcha-container"></div>
      <TextField
        label="phone number "
        className="bg rounded-lg"
        placeholder="Input Phone number"
        InputProps={{
          value: num,
          onChange: (e) => setNum(e.target.value),
        }}
      />
      <button
        className="bg rounded-lg"
        onClick={() => sendCode(num)}
      >
        {' '}
        Send Code{' '}
      </button>
    </Box>
  );
};
export default PhoneNumberInput;
