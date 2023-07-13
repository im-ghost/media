import { Typography, Box, Button, TextField } from '@mui/material';
import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updatePosts } from '../features/post/postSlice';
import { useCreatePostMutation } from '../features/post/postApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const CreatePost = () => {
  const [user, setUser] = React.useState(null);
  const [text, setText] = React.useState('');
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const [createPost, { error, data }] = useCreatePostMutation();
  const create = async (e) => {
    e.preventDefault();
    const data = {
      content: text,
      author: user._id,
    };
    const token = user.token;
    await createPost({ data, token: token }).unwrap();
  };
  React.useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(JSON.stringify(error));
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      dispatch(updatePosts(data.post));
      navigate('/');
    }
  }, [data, navigate]);
  React.useEffect(() => {
    if (!userInfo || userInfo === null) {
      navigate('/login');
    } else {
      setUser(userInfo);
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex flex-row text-center items-center justify-center w-screen h-screen min-h-screen  justify-center dark:text-amber-200 text-amber-800 bg-sky-300 dark:bg-slate-900 items-center p-0">
      <div className="text-center shadow-4xl rounded-[18px]  p-2 w-[80vw] h-[40vh] rounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-40% to-emerald-500 to-100%  dark:from-blue-700 dark:from-20% dark:via-emarald-700 dark:via-30% dark:to-ryan-700 dark:to-100% dark:text-amber-500 text-amber-800  flex flex-col justify-evenly items-center  backdrop-blur-3xl [backdrop-filter: blur(30px)]">
        <Typography
          variant="h4"
          className="md-2 my-2"
        >
          Create A post
        </Typography>

        <Box
          component="form"
          className="mu-2"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '69vw' },
          }}
        >
          <TextField
            placeholder="What is on your mind.."
            label="create post"
            InputProps={{
              value: text,
              onChange: (e) => setText(e.target.value),
            }}
          />
        </Box>
        <Button
          variant="contained"
          onClick={create}
        >
          <Typography variant="body1"> CreatePost </Typography>
        </Button>
      </div>
    </div>
  );
};
export default CreatePost;
