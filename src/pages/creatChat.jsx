import { useGetUserByIdQuery } from '../features/user/userApiSlice';
import { selectUser, setUser } from '../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Chat from '../components/createChat';
import Loader from '../components/loader';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
export default function CreateChat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector(selectUser);
  const { data, error, isLoading } = useGetUserByIdQuery(_id);
  const [user, setUser] = useState();
  useEffect(() => {
    if (data) {
      console.log(data);
      setUser(data.user);
    }
    if (error) {
      toast.error('An error occured');
      navigate(-1);
    }
  }, [data, error]);
  if (user) {
    return (
      <div className="h-screen w-screen bg">
        <Typography
          variant="h4"
          className=""
        >
          Message a friend
        </Typography>
        <Typography
          variant="body2"
          className="text-red-200 text-xs"
        >
          Users you don't follow or are not following you wont display here ,to
          message them search for them and message them from their profile page
        </Typography>
        {user.followers.map((user) => (
          <Chat user={user} />
        ))}
        {user.following.map((user) => (
          <Chat user={user} />
        ))}
      </div>
    );
  }
  if (isLoading) return <Loader isPage={false} />;
  return;
}
