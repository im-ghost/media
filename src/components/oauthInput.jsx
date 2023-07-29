import axios from 'axios';
import Box from '@mui/material/Box';
import React from 'react';
import { google, twitter } from '../pages/auth/firebase';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { setUserSign, setUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
const AuthProviders = ({ isLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _google = async (navigate) => {
    const res = await google(navigate, isLogin);
    if (isLogin) {
      try {
        const { data } = await axios.post(
          'https://media-app-api-a06z.onrender.com/api/v1/users/ologin',
          {
            email: res.email,
          }
        );
        console.log(data);

        await dispatch(setUser(data.user));
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    } else {
      await dispatch(setUserSign(res));
      navigate('/register2');
    }
  };
  const _twitter = async (navigate) => {
    const res = await twitter(navigate, isLogin);
    if (isLogin) {
      try {
        const user = await axios.post(
          'https://media-app-api-a06z.onrender.com/api/v1/users/ologin',
          {
            email: res.email,
          }
        );
        await dispatch(setUser(user.data));
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    } else {
      await dispatch(setUserSign(res));
      navigate('/register2');
    }
  };
  return (
    <Box className="bgg m-2 p-2 center h-16 w-full align-center">
      <div
        className=" shadow-3xl border border-xl h-10 w-10 p-2  center text-center rounded-lg mx-2 bgg"
        onClick={() => _google(navigate)}
      >
        <FaGoogle
          className="text-xl text-bold bgg"
          onClick={() => _google(navigate)}
        />{' '}
      </div>
      <div
        className="shadow-3xl border border-xl h-10 w-10 p-2 rounded-lg flex justify-center align-center text-center mx-2 bgg"
        onClick={() => _twitter(navigate)}
      >
        <FaTwitter className="text-xl text-bold bgg" />
      </div>
    </Box>
  );
};
export default AuthProviders;
