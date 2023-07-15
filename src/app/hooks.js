import { toast } from 'react-toastify';
import axios from 'axios';

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
