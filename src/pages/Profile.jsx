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
import { useGetUserByIdQuery } from '../features/user/userApiSlice';
import { Helmet } from 'react-helmet';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Posts from '../components/posts';
function TabPanel(props) {
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
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const Profile = () => {
  const navigate = useNavigate();
  const userFromStore = useSelector((state) => state.user.userInfo);
  useEffect(()=>{
    if(!userFromStore) navigate("/login")
  },[userFromStore])
  const [user, setUser] = useState();
  const [value, setValue] = useState(0);

  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  
  const { data, error } = useGetUserByIdQuery(userFromStore._id);
  useEffect(() => {
    if (data) {
      setUser(data.user);
      console.log(data.user);
    }
    if (error) {
      toast.error(JSON.stringify(error));
    }
  }, [data, error]);
  if (!user) {
    return (
      <Card onClick={() => navigate('/login')}>
        <Typography variant="h1"> Login </Typography>
      </Card>
    );
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
      <Container className="w-screen h-screen rounded flex items-center justify-center">
        <Container className="w-[100vw] h-[100vh]">
          <Card className="w-full">
            <CardMedia
              image={user.image ? user.image : require('../images/default.png')}
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
              >
                Edit Profile
              </Button>
              <Button
                variant="contained"
                size="small"
              >
                Delete Account
              </Button>
            </CardActions>
          </Card>
          <Paper
            variant="elevation"
            className="flex flex-wrap items-center justify-evenly h-[20vh] w-full"
          >
            <Box className="flex flex-col flex-wrap items-center justify-center">
              <Typography variant="h6">Posts</Typography>

              <Typography variant="body2">{user.posts.length}</Typography>
            </Box>
            <Box className="flex flex-col flex-wrap items-center justify-center">
              <Typography variant="h6">Followers</Typography>

              <Typography variant="body2">{user.followers.length}</Typography>
            </Box>
            <Box className="flex flex-col flex-wrap items-center justify-center">
              <Typography variant="h6">Following</Typography>
              {user.following && (
                <Typography variant="body2">{user.following.length}</Typography>
              )}
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
};
export default Profile;
