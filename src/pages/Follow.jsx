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
import { useLocation, useNavigate } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import Users from '../components/users';
import { TabPanel, a11yProps } from './Profile';
const Follow = () => {
  const { state } = useLocation();
  const { followers, following } = state.data;
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box>
      <Typography variant="h6"></Typography>
      <Box className="w-full h-auto min-h-64 border bg">
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
              label="Followers"
              {...a11yProps(0)}
            />
            <Tab
              label="Following"
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
            <Users users={followers} />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            dir={theme.direction}
          >
            <Users users={following} />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Box>
  );
};

export default Follow;
