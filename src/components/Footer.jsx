import { useNavigate, useLocation } from 'react-router-dom';
import {
  RiHome2Fill,
  RiSearchLine,
  RiMessage2Line,
  RiAccountCircleFill,
  RiNotificationFill,
} from 'react-icons/ri';
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);
  React.useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
      className="flex w-screen bg p-4 mt-auto"
      ref={ref}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className="flex w-full h-8 center bg"
      >
        <BottomNavigationAction
          label="home"
          className={location.pathname.includes('/') ? 'bg-green-900' : ''}
          onClick={() => navigate(`/`)}
          icon={
            <IconButton>
              {' '}
              <RiHome2Fill />{' '}
            </IconButton>
          }
        />
        <BottomNavigationAction
          label="search"
          className={location.pathname.includes('search') ? 'bg-green-900' : ''}
          onClick={() => navigate(`/search`)}
          icon={
            <IconButton>
              {' '}
              <RiSearchLine />{' '}
            </IconButton>
          }
        />
        <BottomNavigationAction
          label="notifications"
          className={
            location.pathname.includes('notifications') ? 'bg-green-900' : ''
          }
          onClick={() => navigate(`/notifications`)}
          icon={
            <IconButton>
              {' '}
              <RiNotificationFill />{' '}
            </IconButton>
          }
        />
        <BottomNavigationAction
          label="chats"
          className={location.pathname.includes('chats') ? 'bg-green-900' : ''}
          onClick={() => navigate(`/chats`)}
          icon={
            <IconButton>
              {' '}
              <RiMessage2Line />{' '}
            </IconButton>
          }
        />
        <BottomNavigationAction
          label="profile"
          className={
            location.pathname.includes('profile') ? 'bg-green-900' : ''
          }
          onClick={() => navigate(`/profile`)}
          icon={
            <IconButton>
              {' '}
              <RiAccountCircleFill />{' '}
            </IconButton>
          }
        />
      </BottomNavigation>
    </Paper>
  );
};
export default Footer;
