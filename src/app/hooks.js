import { toast } from 'react-toastify';
import axios from 'axios';

export const useNotify = async ({
  content, userId, token, authorId,
}) => {
  if (authorId.toString() === userId.toString()) {
    try {
      const {
        data,
      } = await axios.post(`http://localhost:4000/users/user/${userId}/notifications`, {
        headers: {
          authorization: token,
        },
        body: content,
      });
      if (data) {
        toast.info(JSON.stringify(data));
      }
    } catch (e) {
      toast.error(JSON.stringify(e));
    }
  }
};
