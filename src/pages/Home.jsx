import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Add from "../components/Add";
import Posts from '../components/posts';
import { useAllUsersQuery } from '../features/user/userApiSlice';
import { selectUser } from '../features/user/userSlice';
const Home = () => {
  const userFromStore = useSelector(selectUser);
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  React.useLayoutEffect(() => {
    if (!userFromStore || !userFromStore.token) {
      navigate('/login');
    }
  }, [userFromStore, navigate]);

  useEffect(() => {
    toast.info('Welcome to media');
  }, []);

  const { data: dataF, error: errorF } = useAllUsersQuery(userFromStore.token);
  useEffect(() => {
    if (dataF || errorF) {
      setData(dataF);
      setError(errorF);
      console.log('f' + dataF);
      console.log('d' + data);
    }
    if (errorF) {
      navigate('/');
    }
  }, [dataF, errorF]);
  useEffect(() => {
    if (data) {
      if (data.users) {
        console.log(data);
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
  if (userFromStore && userFromStore !== null && userFromStore.token) {
    return (
      <div className="bg p-0 m-0">
        <div className="w-screen h-10 flex items-center justify-center m-0">
          <img
            src={require("../images/logo192.png")}
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
        {posts.length > 0 ? (
          <Posts
            posts={posts}
            token={userFromStore.token}
          />
        ) : <Typography variant="h4">No posts available.</Typography>}
       <Add />
        <Outlet />
      </div>
    );
  }
  return <h1 onClick={() => navigate('/login')}>Login</h1>;
};
export default Home;
