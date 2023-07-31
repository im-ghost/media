import { Paper, Typography, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { useDelNotMutation } from '../features/user/userApiSlice';
import { FaTrash } from 'react-icons/fa';
import React from 'react';
import { useNavigate } from "react-router-dom";

const Notification = ({ notification, token, userId }) => {
  const navigate = useNavigate();
  const [not, setNotificaton] = React.useState(notification);
  const [delIt, { data, error }] = useDelNotMutation();
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
      <Paper className="w-screen bg flex" onClick={()=>navigate(`/posts/${not.postId}`)}>
        <Typography variant="body1">{not.content}</Typography>
        <IconButton onClick={del} className="w-[10%] border bg-red-800 rounded">
          <FaTrash />
        </IconButton>
      </Paper>
    );
  }
  return;
};

export default Notification;
