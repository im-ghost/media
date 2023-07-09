import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Posts from '../components/posts';
import { useAllUsersQuery } from '../features/user/userApiSlice';

const Helper = ({ userFromStore, token }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [posts, setPosts] = useState([]);

  const { data: dataF, error: errorF } = useAllUsersQuery(token);
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
  }, [data, error]);
  if (posts.length < 1) {
    return <Typography variant="h4">No posts available.</Typography>;
  }
  return (
    <Posts
      posts={posts}
      token={userFromStore.token}
    />
  );
};
export default Helper;