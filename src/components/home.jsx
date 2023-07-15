import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Posts from '../components/posts';
import { useAllPostsQuery } from '../features/user/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPostsInStore } from '../features/post/postSlice';
const Helper = ({ userFromStore, token }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: dataF, error: errorF } = useAllPostsQuery(token);
  useEffect(() => {
    if (dataF || errorF) {
      setData(dataF);
      setError(errorF);
    }
    if (errorF) {
      navigate('/login');
    }
  }, [dataF, errorF]);
  useEffect(() => {
    if (data) {
      if (data.posts) {
        const { followers,following } = userFromStore;
        const posts = data.posts.filter((post) => followers.includes(post.author) || following.includes(post.author))
        
        if (posts.length > 0) {
          setPosts(posts);
          dispatch(setPostsInStore(posts));
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
