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
import Loader from '../components/loader';
import {
  useGetUserByIdQuery,
  useDeleteUserMutation,
} from '../features/user/userApiSlice';
import { setUser as SetUser } from '../features/user/userSlice';
import { Helmet } from 'react-helmet';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import Posts from '../components/posts';
export function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userFromStore = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    if (!userFromStore) navigate('/login');
  }, [userFromStore]);
  const [user, setUser] = useState();
  const [value, setValue] = useState(0);

  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const [del, { isLoading, error: delError, data: delData }] =
    useDeleteUserMutation();
  const { data, error } = useGetUserByIdQuery(userFromStore._id);
  useEffect(() => {
    if (data) {
      setUser(data.user);
      dispatch(SetUser(data.user));
      console.log(data.user);
    }
    if (error) {
      toast.error(JSON.stringify(error));
    }
  }, [data, error]);
  useEffect(() => {
    if (delData) {
      console.log();
      navigate('/login');
    }
    if (delError) {
      toast.error(JSON.stringify(delError));
    }
  }, [delData, delError]);

  const deleteAcct = async (e) => {
    await del({
      userId: userFromStore._id,
      token: userFromStore.token,
    });
  };
  if (!user) {
    return <Loader isPage={true} />;
  }
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
      <div className="w-[100vw] h-full bg">
        <Card className="w-full bg">
          <CardMedia
            image={user.image ? user.image : require('../images/default.png')}
            className="h-0 pt-[56.25%] mt-[30]"
            sx={{
              height: 0,
              paddingTop: '56.25%',
              marginTop: '30',
            }}
          />
          <CardContent className="w-full text-center bg">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="header"
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
          <CardActions className="w-full flex justify-between flex-row bg">
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate('/edituser')}
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={deleteAcct}
            >
              Delete Account
            </Button>
          </CardActions>
        </Card>
        <Paper
          variant="elevation"
          className="flex flex-wrap items-center justify-evenly h-[20vh] w-full bg"
        >
          <Box className="flex flex-col flex-wrap items-center justify-center bg">
            <Typography variant="h6">Posts</Typography>

            <Typography variant="body2">{user.posts.length}</Typography>
          </Box>
          <Box className="flex flex-col flex-wrap items-center justify-center bg">
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

              <Typography variant="body2">{user.followers.length}</Typography>
            </Link>
          </Box>
          <Box className="flex flex-col flex-wrap items-center justify-center bg">
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
              {user.following && (
                <Typography variant="body2">{user.following.length}</Typography>
              )}
            </Link>
          </Box>
        </Paper>
        <div className="w-screen h-auto min-h-64 border bg">
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
            className="h-auto min-h-64 w-screen"
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel
              value={value}
              index={0}
              dir={theme.direction}
              className="w-screen"
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
              className="w-screen"
            >
              <Posts
                posts={user.retweets}
                token={user.token}
              />
            </TabPanel>
          </SwipeableViews>
        </div>
      </div>
    </>
  );
};
export default Profile;
