import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/store';
import { Typography } from '@mui/material';
import Favicon from '../images/logo192.png';
import { toast } from 'react-toastify';
import Posts from '../components/posts';
import { useAllUsersQuery } from '../features/user/userApiSlice';
const Home = () => {
  const userFromStore = useAppSelector((state) => state.user.userInfo);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { data, error } = useAllUsersQuery(userFromStore?.token);
  useEffect(() => {
    toast.info('Welcome to media');
  }, []);
  useEffect(() => {
    if (userFromStore?.token) {
      if (data) {
        const fetchedPosts = data.users.reduce((acc, user) => {
          if (user.posts) {
            acc.push(...user.posts);
          }
          return acc;
        }, []);
        if (fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
        }
      } else {
        toast.error(JSON.stringify(error));
      }
    }
  }, [data, error, userFromStore]);
  useEffect(() => {
    if (!userFromStore || !userFromStore.token) {
      navigate('/login');
    }
  }, [userFromStore, navigate]);
  if (userFromStore && userFromStore !== null && userFromStore.token) {
    return (
      <div className="bg p-0 m-0">
        <div className="w-screen h-10 flex items-center justify-center m-0">
          <img
            src={Favicon}
            alt="Media"
            className="h-8 w-8 p-0 m-0 rounded-[50%] animate-bounce"
          />
          <Typography
            variant="h3"
            className="text-bold"
          >
            Media
          </Typography>
        </div>
        {posts.length > 0 && (
          <Posts
            posts={posts}
            token={userFromStore.token}
          />
        )}

        <Outlet />
      </div>
    );
  }
  return <h1 onClick={() => navigate('/login')}>Login</h1>;
};
export default Home;
