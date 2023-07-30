import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Posts from '../components/posts';
import { useFeedsQuery } from '../features/user/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPostsInStore } from '../features/post/postSlice';
const Helper = ({ userFromStore, token }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: dataF, error: errorF } = useFeedsQuery(token);
  useEffect(() => {
    if (dataF || errorF) {
      setData(dataF);
      setError(errorF);
    }
    if (errorF) {
      console.log(errorF);
      if (errorF.data.message === 'Not Found') {
        toast.error('Server error');
        setTimeout(function () {
          navigate(0);
        }, 2000);
      } else {
        navigate('/login');
      }
    }
  }, [dataF, errorF]);
  useEffect(() => {
    if (data) {
      if (data.posts) {
        const posts = data.posts;
        if (posts.length > 0) {
          setPosts(posts);
          dispatch(setPostsInStore(posts));
        }
      } else {
        toast.error(JSON.stringify(error));
      }
    }
  }, [data, error]);
  if (posts === null) {
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
