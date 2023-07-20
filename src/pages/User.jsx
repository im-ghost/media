import {
  Typography,
  Container,
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Box,
  Tabs,
  Tab,
  AppBar,
} from '@mui/material';
import {
  useGetUserByIdQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../features/user/userApiSlice';
import { useCreateChatMutation } from '../features/chat/chatApiSlice';
import { Helmet } from 'react-helmet';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';

import { toast } from 'react-toastify';
import Posts from '../components/posts';
import { TabPanel, a11yProps } from './Profile';
const User = () => {
  const [user, setUser] = useState();
  const [value, setValue] = useState(0);
  const [isFollowing, setFollowing] = useState(false);
  const [disable, setDisable] = useState(false);
  const { id } = useParams();
  const { data, error } = useGetUserByIdQuery(id);
  const [createChat, { data: chat, error: chatError }] =
    useCreateChatMutation();
  const [
    follow,
    { isLoading: followLoading, error: followError, data: followed },
  ] = useFollowUserMutation();
  const [
    unfollow,
    { isLoading: unfollowLoading, error: unfollowError, data: unfollowed },
  ] = useUnfollowUserMutation();

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
      if (user.following.includes(userFromStore._id)) {
        setFollowing(true);
      }
    }
  }, [user]);
  const followUser = async () => {
    setDisable(true);
    if (user.following.includes(userFromStore._id)) {
      await unfollow({
        userId: user._id,
        token: userFromStore.token,
      });
      // setFollowing(true)
    } else {
      await follow({
        userId: user._id,
        token: userFromStore.token,
      });
      // setFollowing(false)
    }
  };
  useEffect(() => {
    if (data) {
      setUser(data.user);
      console.log(data.user);
    }
    if (error) {
      toast.error(JSON.stringify(error));
    }
  }, [data, error]);
  useEffect(() => {
    if (chat) {
      navigate(`/chats/${chat._id}`);
    }
    if (chatError) {
      toast.error(JSON.stringify(chatError));
    }
  }, [chat, chatError]);
  const navigate = useNavigate();
  const userFromStore = useSelector((state) => state.user.userInfo);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const create = async () => {
    await createChat({
      receiver: user._id,
      token: userFromStore.token,
    });
  };
  if (user) {
    return (
      <>
        <Helmet>
          <title> {user.name} </title>

          <meta
            name="description"
            content={user.bio}
          />
          <meta
            property="og:image"
            content={user.image ? user.image : require('../images/default.png')}
          />
        </Helmet>
        <Container className="w-screen h-screen rounded flex items-center justify-center">
          <Container className="w-[100vw] h-[100vh]">
            <Card className="w-full">
              <CardMedia
                image={
                  user.image ? user.image : require('../images/default.png')
                }
                className="h-0 pt-[56.25%] mt-[30]"
                sx={{
                  height: 0,
                  paddingTop: '56.25%',
                  marginTop: '30',
                }}
              />
              <CardContent className="w-full text-center">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {user.bio}
                </Typography>
              </CardContent>
              <CardActions className="w-full flex justify-between flex-row">
                <Button
                  variant="contained"
                  size="small"
                  disable={disable}
                  onClick={followUser}
                >
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={chat}
                >
                  Message
                </Button>
              </CardActions>
            </Card>
            <Paper
              variant="elevation"
              className="flex flex-wrap items-center justify-evenly h-[20vh] w-screen"
            >
              <Box className="flex flex-col flex-wrap items-center justify-center">
                <Typography variant="h6">Posts</Typography>
                <Typography variant="body2">{user.posts.length}</Typography>
              </Box>
              <Box className="flex flex-col flex-wrap items-center justify-center">
                <Link
                  to={`/follow`}
                  state={{
                    data: {
                      following: user.following,
                      followers: user.followers,
                    },
                  }}
                >
                  <Typography variant="h6">Followers</Typography>
                  <Typography variant="body2">
                    {user.followers.length}
                  </Typography>
                </Link>
              </Box>
              <Box className="flex flex-col flex-wrap items-center justify-center">
                <Link
                  to={`/follow`}
                  state={{
                    data: {
                      following: user.following,
                      followers: user.followers,
                    },
                  }}
                >
                  <Typography variant="h6">Following</Typography>
                  <Typography variant="body2">
                    {user.following.length}
                  </Typography>
                </Link>
              </Box>
            </Paper>
            <Box className="w-full h-auto min-h-64 border">
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab
                    label="Posts"
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="Retweets"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                className="h-auto min-h-64 "
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel
                  value={value}
                  index={0}
                  dir={theme.direction}
                >
                  <Posts
                    posts={user.posts}
                    token={user.token}
                  />
                </TabPanel>
                <TabPanel
                  value={value}
                  index={1}
                  dir={theme.direction}
                >
                  <Posts
                    posts={user.retweets}
                    token={user.token}
                  />
                </TabPanel>
              </SwipeableViews>
            </Box>
          </Container>
        </Container>
      </>
    );
  }
  return (
    <Card onClick={() => navigate('/login')}>
      <Typography variant="h1"> Login </Typography>
    </Card>
  );
};
export default User;
