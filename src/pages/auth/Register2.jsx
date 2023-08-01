import { Typography, TextField, Box, Button } from '@mui/material';
import React, { useState, useReducer, useEffect } from 'react';
import { useRegisterUserMutation } from '../../features/user/userApiSlice';
import { setUser as SetUser } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { initialState, reducer } from './reducer';
import { Password } from '../../components/passwordInput';
import { Email } from '../../components/emailComponent';
import ImageUploader from './image';
const Register2 = () => {
  const [imageUrl, setImageUrl] = useState();

  const [passwordSet, setPasswordSet] = useState(false);
  const [user, setUser] = useState(null);
  const [emailAuth, setEmailAuth] = useState(false);
  const [phoneAuth, setPhoneAuth] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const userSign = useSelector((state) => state.user.userSign);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { error, data }] = useRegisterUserMutation();
  const create = async (e) => {
    e.preventDefault();
    setState({ type: 'reset' });
    const data = {
      name: state.name,
      email: state.email,
      phone: state.phone,
      password: state.password,
      bio: state.bio,
      image: imageUrl ? imageUrl : 'https://richardmediaapp/default.png',
    };
    console.log(data);
    await register(data).unwrap();
  };
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(JSON.stringify(error));
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      console.log(data);
      (async () => {
        await dispatch(SetUser(data.user));
      })();
      navigate('/profile');
    }
  }, [data, navigate, dispatch]);
  useEffect(() => {
    const setIt = async (user) => {
      if (user) {
        await dispatch(SetUser(user.user));
      }
    };
    console.log(userInfo);
    console.log(user);
    if (user) {
      setUser(user);
      navigate('/profile');
      setIt(user);
    }
  }, [user, navigate, userInfo, dispatch]);
  useEffect(() => {
    if (userSign !== null || userSign !== undefined) {
      if (userSign && userSign.num !== undefined) {
        setPhoneAuth(true);
        setState({
          type: 'setTel',
          payload: userSign.num,
        });
      } else if (userSign && userSign.email !== undefined) {
        setEmailAuth(true);
        setState({
          type: 'setEmail',
          payload: userSign.email,
        });
      }
      if (
        userSign &&
        userSign.displayName !== undefined &&
        userSign.photoUrl !== undefined &&
        userSign.uid
      ) {
        setPasswordSet(true);
        console.log(passwordSet);
        setState({
          type: 'setName',
          payload: userSign.displayName,
        });
        setState({
          type: 'setPassword',
          payload: userSign.uid,
        });
        setState({
          type: 'setImage',
          payload: userSign.photoUrl,
        });
      }
    }
  }, [userSign]);
  const [state, setState] = useReducer(reducer, initialState);
  return (
    <div className="flex flex-row text-center items-center justify-center w-screen h-screen min-h-screen  justify-center bg  items-center p-0">
      <div className="text-center shadow-4xl rounded-[18px]  p-2 w-[80vw] h-[60vh] rounded-lg bg">
        <Typography variant="h2">Complete your registration</Typography>
        <Box
          component="form"
          noValidate
          autoComplete="on"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '70vw' },
          }}
        >
          {state.name && state.name.length < 2 && (
            <TextField
              id="name"
              label="Name"
              placeholder="Full name"
              InputProps={{
                value: state.name,
                onChange: (e) => {
                  setState({
                    type: 'setName',
                    payload: e.target.value,
                  });
                },
              }}
            />
          )}
          {emailAuth && (
            <TextField
              id="tel"
              label="Telephone"
              placeholder="Telephone"
              InputProps={{
                type: 'tel',
                value: state.phone,
                onChange: (e) => {
                  setState({
                    type: 'setTel',
                    payload: e.target.value,
                  });
                },
              }}
            />
          )}
          {phoneAuth && (
            <Email
              value={state.email}
              onChange={setState}
            />
          )}

          {passwordSet ? (
            ''
          ) : (
            <Password
              value={state.password}
              onChange={setState}
            />
          )}
          <TextField
            id="bio"
            label="Bio"
            placeholder="Tell us something about yourself"
            InputProps={{
              value: state.bio,
              onChange: (e) => {
                setState({
                  type: 'setBio',
                  payload: e.target.value,
                });
              },
            }}
          />
          <ImageUploader
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </Box>
        <Button
          variant="outlined"
          className="text-center shadow-4xl rounded-[8px]  p-2 w-[40vw] h-[6vh] rounded-lg bg flex flex-col justify-evenly items-center"
          onClick={create}
        >
          <Typography variant="h6"> Create </Typography>
        </Button>
        <div
          className="p-2 rounded shadow bg"
          onClick={() => navigate('/login')}
        >
          <Typography variant="h6"> Already have an account? Login</Typography>
        </div>
      </div>
    </div>
  );
};
export default Register2;
