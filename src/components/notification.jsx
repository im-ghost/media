import { Paper, Typography, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { useDelNotificationMutation } from '../features/user/userApiSlice';
import { FaTrash } from 'react-icons/fa';
import React from 'react';
const Notification = ({ notification, token, userId }) => {
  const [not, setNotificaton] = React.useState(notification);
  const [delIt, { data, error }] = useDelNotificationMutation();
  React.useEffect(() => {
    if (data) {
      toast.info('Notification deleted');
      setNotificaton();
    }
    if (error) {
      toast.error(JSON.stringify(error));
    }
  }, [data, error]);
  const del = async () => {
    await delIt({
      token: token,
      userId: userId,
      notificationId: notification._id,
    });
  };
  if (not) {
    return (
      <Paper className="w-screen">
        <Typography variant="body1">{not.content}</Typography>
        <IconButton onClick={del}>
          <FaTrash />
        </IconButton>
      </Paper>
    );
  }
  return;
};

export default Notification;
