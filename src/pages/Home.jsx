import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Add from '../components/Add';
import { selectUser } from '../features/user/userSlice';
import Helper from '../components/home';
const Home = () => {
  const userFromStore = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (userFromStore === null) {
      navigate('/login');
    }
  }, [userFromStore, navigate]);

  if (userFromStore && userFromStore !== null) {
    return (
      <div className="bg p-0 m-0">
        <div className="w-screen h-10 flex items-center justify-center m-0">
          <img
            src={require('../images/logo192.png')}
            alt="Media"
            className="h-8 w-8 p-0 m-0 rounded-[50%] animate-bounce"
          />
          <Typography
            variant="h4"
            className="text-bold"
          >
            Media
          </Typography>
        </div>
        <Helper
          userFromStore={userFromStore}
          token={userFromStore.token}
        />
        <Add />
        <Outlet />
      </div>
    );
  }
  return <h1 onClick={() => navigate('/login')}>Login</h1>;
};
export default Home;
