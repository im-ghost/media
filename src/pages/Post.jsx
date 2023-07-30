import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useGetPostByIdQuery } from '../features/post/postApiSlice';
import { selectUser } from '../features/user/userSlice';
import { selectPosts } from '../features/post/postSlice';
import Helper from '../components/phelper';
import Loader from '../components/loader';
import { socket } from '../app/store';
export default function Post() {
  const [dPost, setPost] = useState();
  const posts = useSelector(selectPosts);
  const user = useSelector(selectUser);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error } = useGetPostByIdQuery(id);
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);
  useEffect(() => {
    if (data) {
      setPost(data);
      console.log(data);
    }
    if (error) {
      toast.error('Page not found');
      navigate('/');
    }
  }, [data, error]);

  if (dPost) {
    return <Helper post={dPost} />;
  }
  return <Loader />;
}
