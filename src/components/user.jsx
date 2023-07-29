import { Typography, Button, Paper, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetUserByIdQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../features/user/userApiSlice';
import { selectUser, setUser } from '../features/user/userSlice';
const User = ({ userId }) => {
  //console.log(userId);
  const me = useSelector(selectUser);
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const [user, setUser] = useState();
  const [userFollowing, setFollowing] = useState(false);
  const { data, error, isLoading } = useGetUserByIdQuery(userId);
  const [
    follow,
    { isLoading: followLoading, error: followError, data: followed },
  ] = useFollowUserMutation();
  const [
    unfollow,
    { isLoading: unfollowLoading, error: unfollowError, data: unfollowed },
  ] = useUnfollowUserMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setUser(data.user);
      console.log(data);
    }
    if (error) {
      toast.error(JSON.stringify(error));
    }
  }, [data, error]);
  useEffect(() => {
    if (followed) {
      setFollowing(true);
    }
    if (followError) {
      toast.error(JSON.stringify(followError));
    }
    setDisable(false);
  }, [followed, followError]);
  useEffect(() => {
    if (unfollowed) {
      setFollowing(false);
    }
    if (unfollowError) {
      toast.error(JSON.stringify(unfollowError));
    }
    setDisable(false);
  }, [unfollowed, unfollowError]);
  useEffect(() => {
    if (user) {
      if (user.following.includes(me._id)) {
        setFollowing(true);
      }
    }
  }, [user]);
  const followUser = async () => {
    setDisable(true);
    if (user.following.includes(me._id)) {
      await unfollow({
        userId: user._id,
        token: me.token,
      });
      // setFollowing(true)
    } else {
      await follow({
        userId: user._id,
        token: me.token,
      });
      // setFollowing(false)
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  if (user) {
    return (
      <Paper className="center bg">
        <Box
          className="flex flex-grow-2"
          onClick={() => navigate(`/users/${user._id}`)}
        >
          <img
            src={user.image}
            alt={user.name}
            className="h-6 w-auto"
          />
          <Typography variant="body1">{user.name}</Typography>
        </Box>
        <Button
          disable={disable}
          onClick={followUser}
        >
          {userFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </Paper>
    );
  }
  return;
};
export default User;
