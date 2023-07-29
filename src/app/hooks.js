import { toast } from 'react-toastify';
import axios from 'axios';
import { formatDistanceToNow, format } from 'date-fns';

export function formatDate(dDate) {
  const date = new Date(dDate);
  const currentDate = new Date();
  const diffInMilliseconds = Math.abs(currentDate - date);

  // Check if the difference is less than 1 minute
  if (diffInMilliseconds < 60000) {
    return 'just now';
  }

  // Check if the difference is less than 1 hour
  if (diffInMilliseconds < 3600000) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  // Check if the difference is less than 1 day
  if (diffInMilliseconds < 86400000) {
    return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
  }

  // If it's beyond a day, return the date and time
  return format(date, 'yyyy-MM-dd');
}

export const useNotify = async ({
  content, userId, token, authorId,
}) => {
  if (authorId.toString() === userId.toString()) {
    console.log('usenotify', token);
    const url = `http://localhost:4000/api/v1/not/n/${userId}`;
    try {
      const res = await axios({
        method: 'post',
        url,
        headers: {
          authorization: token,
        },
        data: {
          content,
        },
      });
      if (res) {
        console.log(res.data);
        toast.info(JSON.stringify(res.data.notification.content));
      }
    } catch (e) {
      toast.error(JSON.stringify(e));
    }
  }
};
