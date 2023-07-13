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
  TextField,
} from '@mui/material';
import { useAllUsersQuery } from '../features/user/userApiSlice';
import { selectUser } from '../features/user/userSlice';
import {} from '../features/post/postSlice';
import { useAllPostsQuery } from '../features/post/postApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { a11yProps, TabPanel } from './Profile';
import { Helmet } from 'react-helmet';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import Posts from '../components/posts';
import Users from '../components/users';
const Search = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState('');
  const { data, error, isLoading } = useAllUsersQuery(user.token);
  const {
    data: pData,
    error: pError,
    isLoading: pLoading,
  } = useAllPostsQuery();
  useEffect(() => {
    if (data) {
      console.log(data);
      setUsers(data.users);
    }
    if (error) {
      toast.error(JSON.stringify(error));
    }
  }, [data, error]);
  useEffect(() => {
    if (pData) {
      console.log(pData);
      setPosts(pData.posts);
    }
    if (pError) {
      toast.error(JSON.stringify(pError));
    }
  }, [pData, pError]);
  useEffect(() => {
    if (search.length > 0 && users && posts) {
      // Filter users by user.name
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );

      // Filter posts by post.content
      const filteredPosts = posts.filter((post) =>
        post.content.toLowerCase().includes(search.toLowerCase())
      );

      setUsers(filteredUsers);
      setPosts(filteredPosts);
    } else if (pData && data) {
      // Reset the users and posts to the original data if search is empty
      setUsers(data.users);
      setPosts(pData.posts);
    }
  }, [search, posts, users]);

  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  if (users || posts) {
    return (
      <>
        <TextField
          InputProps={{
            value: search,
            onChange: (e) => setSearch(e.target.value),
          }}
        />
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
                label="Users"
                {...a11yProps(0)}
              />
              <Tab
                label="Posts"
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
              {users && <Users users={users} />}
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
              dir={theme.direction}
            >
              {posts && (
                <Posts
                  posts={posts}
                  token={user.token}
                />
              )}
            </TabPanel>
          </SwipeableViews>
        </Box>
      </>
    );
  }
  return <Typography> No search Results</Typography>;
};

export default Search;
