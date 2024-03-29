import { Typography, Box, Button, TextField } from '@mui/material';
import * as React from 'react';
import Uploader from '../components/uploaded';
import { useSelector, useDispatch } from 'react-redux';
import { addToStorePosts } from '../features/post/postSlice';
import { useCreatePostMutation } from '../features/post/postApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const CreatePost = () => {
  const [user, setUser] = React.useState(null);
  const [text, setText] = React.useState('');
  const [url, setUrl] = React.useState();
  const [name, setName] = React.useState();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const [createPost, { error, data }] = useCreatePostMutation();
  const create = async (e) => {
    e.preventDefault();
    const data = {
      content: url ? '' : text,
      author: user._id,
      caption: url ? text : '',
      image: url,
      name: name,
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
      dispatch(addToStorePosts(data.post));
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
    <div className="flex flex-row text-center items-center justify-center w-screen h-full min-h-full  justify-center bg items-center p-0">
      <div className="text-center shadow-4xl rounded-[18px]  p-2 w-[80vw] h-[40vh] rounded-lg bg flex flex-col justify-evenly items-center  ">
        <Typography
          variant="h4"
          className="md-2 my-2 header"
        >
          Create A post
        </Typography>

        <Box
          component="form"
          className="mu-2 bg"
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
          <Uploader
            setUrl={setUrl}
            setName={setName}
            url={url}
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
