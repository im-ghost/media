import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Default from '../images/default.png';
import Comments from "./comments"
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  TextField,
  Paper,
  IconButton,
  Typography,
  CardMedia,
  Container,
  Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { useGetUserByIdQuery } from '../features/user/userApiSlice';
import { selectUser } from '../features/user/userSlice';
import { socket } from '../app/store';
import { IoThumbsUp, IoChatbox, IoRepeat } from 'react-icons/io5';

const Helper = ({ post }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [dPost, setPost] = useState(post.post);
  const [comment, setComment] = useState('');
  const user = useSelector(selectUser);
  const [author, setAuthor] = useState(null);

  const [liked, setLiked] = React.useState(false);
  const [retweeted, setRetweeted] = React.useState(false);
  useEffect(() => {
    if (dPost && user._id) {
      socket.on(`likedpost-${dPost._id}`, (post) => {
        setLiked(true);
        setPost(post);
      });
      socket.on(`unlikedpost-${dPost._id}`, (post) => {
        setLiked(false);
        setPost(post);
      });
      socket.on(`retweetedpost-${dPost._id}`, ({ post, user }) => {
        setRetweeted(true);
        setPost(post);
        dispatch(setUser(user));
      });
      socket.on(`unretweetedpost-${dPost._id}`, ({ post, user }) => {
        setRetweeted(false);
        setPost(post);
        dispatch(setUser(user));
      });
      socket.on(`commentedonpost-${dPost._id}`, (post) => {
        setPost(post);
      });
      socket.on('error', () => {
        toast.error('An error occured');
      });
    }
  }, []);
  useEffect(() => {
    if (dPost && user) {
      console.log(dPost);
      const likes = dPost.likes;
      if (likes.includes(user._id)) {
        setLiked(true);
      }
      if (dPost.retweets.includes(user._id)) {
        setRetweeted(true);
      }
    }
  }, [user]);
  const retweetPost = async () => {
    if (dPost && user) {
      if (dPost.retweets.includes(user._id)) {
        socket.emit('retweetpost', {
          postId: dPost._id,
          userId: user._id,
        });
      } else {
        socket.emit('unretweetpost', {
          postId: dPost._id,
          userId: user._id,
        });
      }
    }
  };
  const commentOnPost = async () => {
    setComment('');
    socket.emit('commentonpost', {
      postId: dPost._id,
      userId: user._id,
      comment: comment,
    });
  };
  const likePost = async () => {
    if (dPost && user) {
      if (dPost.likes.includes(user._id)) {
        socket.emit('unlikepost', {
          postId: dPost._id,
          userId: user._id,
        });
      } else {
        socket.emit('likepost', {
          postId: dPost._id,
          userId: user._id,
        });
      }
    }
  };
  const userId = dPost.author;
  const { data, error } = useGetUserByIdQuery(userId);
  useEffect(() => {
    if (data) {
      setAuthor(data.user);
    }
    if (error) {
      toast.error(JSON.stringify(error));
      navigate('/');
    }
  }, [data, error]);
  if (error) {
    console.log('error');
    toast.error(JSON.stringify(error));
    return <h1> Post not found </h1>;
  }
  if (!author) {
    return <h1>Loading....</h1>;
  }
  return (
    <Container>
      <Helmet>
        <title>
          {' '}
          {dPost.content
            ? `${dPost.content.substring(0, 10)}...`
            : dPost.caption}
        </title>
      </Helmet>
      <Card
        raised={true}
        className="w-full h-44 overflow-scroll rounded-lg p-2 text-center shadow-4xl rounded-[20px]  flex flex-col justify-evenly items-center m-2"
      >
        <div className="flex justify-between align-center">
          <img
            src={author.image || Default}
            alt={author.name}
            className="h-8 w-auto rounded-[50%] mx-4"
          />

          <Typography variant="body1">{author.name}</Typography>
        </div>
        {dPost.date && (
          <Typography variant="body2">{dPost.date.toString()}</Typography>
        )}

        {dPost.image && dPost.image !== null ? (
          <div className="bg">
            <CardMedia
              component="img"
              height="194"
              image={dPost.image || ''}
              alt={dPost.content || ''}
              className="bg m-0"
            />
            <CardContent className="bg m-0">
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {dPost.caption || ''}
              </Typography>
            </CardContent>
          </div>
        ) : (
          <Paper className="flex justify-center m-0 items-center bg h-28 p-2 w-[80%]">
            {dPost.content || ''}
          </Paper>
        )}
        <CardActions
          disableSpacing
          className=" rounded-lg p-2 text-center shadow-4xl rounded-[18px]  rounded-lg flex justify-evenly items-center h-4 m-0"
        >
          <IconButton
            className="bg"
            aria-label="like"
          >
            <IoThumbsUp
              onClick={likePost}
              className={liked ? 'text-red-900' : ''}
            />
            {dPost.likes.length}{' '}
          </IconButton>
          <IconButton
            className="bg"
            aria-label="comment"
            onClick={() => inputRef?.current?.focus()}
          >
            Comment
          </IconButton>
          <IconButton
            className="bg"
            aria-label="retweet"
          >
            <IoRepeat
              className={retweeted ? 'text-red-900' : ''}
              onClick={retweetPost}
            />
            {dPost.retweets.length}{' '}
          </IconButton>
        </CardActions>
      </Card>
      <Container>
       <Comments comments={dPost.comments} token={user.token} user={user}/>
      </Container>
      <Container className="fixed bottom-[3em] flex">
        <TextField
          InputProps={{
            value: comment,
            onChange: (e) => setComment(e.target.value),
          }}
        />
        <Button onClick={commentOnPost}>Send</Button>
      </Container>
    </Container>
  );
};

export default Helper;
