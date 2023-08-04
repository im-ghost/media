import { useGetNotificationQuery } from '../features/user/userApiSlice';
import Notification from '../components/notification';
import { toast } from 'react-toastify';
import Loader from '../components/loader';
import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
const Notifications = () => {
  const { token, _id } = useSelector(selectUser);
  const [notifications, setNotifications] = useState();
  const { data, error, isLoading } = useGetNotificationQuery({
    token: token,
    userId: _id,
  });
  useEffect(() => {
    if (data) {
      setNotifications(data.notifications);
    }
    if (error) {
      toast.error(JSON.stringify(error));
    }
  }, [data, error]);
  if (isLoading) {
    return <Loader isPage={true} />;
  }
  if (notifications && notifications.length > 0) {
    return (
      <Box className="bg w-screen min-h-full h-auto overflow-scroll">
        <Typography variant="h4">Notifications</Typography>
        {notifications.map((not) => (
          <Notification
            notification={not}
            token={token}
            userId={_id}
          />
        ))}
      </Box>
    );
  }
  return (
    <Typography
      className="bg w-screen min-h-full"
      variant="h4"
    >
      No Notifications{' '}
    </Typography>
  );
};

export default Notifications;
