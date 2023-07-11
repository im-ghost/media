import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Paper,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../features/user/userSlice';
import { useGetUserByIdQuery } from '../features/user/userApiSlice';
import {} from "../features/post/postApiSlice"
import { toast } from 'react-toastify';
import Default from '../images/default.png';

import { io } from 'socket.io-client';
import { IoThumbsUp, IoChatbox, IoRepeat } from 'react-icons/io5';

const socket = io('http://localhost:4000');
const Post = ({ post, token }) => {
  const [dPost, setPost] = useState(post.post);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [author, setAuthor] = useState(null);
  
  const [editValue, setEditValue] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [retweeted, setRetweeted] = React.useState(false);
  useEffect(()=>{
    setEditValue(dPost.content)
  },[dPost])
  useEffect(() => {
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
    socket.on('error', () => {
      toast.error('An error occured');
    });
  }, []);
  useEffect(() => {
    const likes = dPost.likes;
    if (likes.includes(user._id)) {
      setLiked(true);
    }
    if (dPost.retweets.includes(user._id)) {
      setRetweeted(true);
    }
  }, [user]);
  const retweetPost = async () => {
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
  };
  const commentOnPost = async () => {
    if (dPost._id) {
      navigate(`posts/${dPost._id}`);
    }
  };
  const likePost = async () => {
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
  };
  const userId = dPost.author;
  const edit = () =>{
    setShow(true)
  }
  const saveEdit = () =>{}
  const deletePost = () =>{}
  const { data, error } = useGetUserByIdQuery(userId);
  useEffect(() => {
    if (error) {
      toast.error(JSON.stringify(error));
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      setAuthor(data.user);
    }
  }, [data]);
  if (!data || !author) {
    return <h1>Loading....</h1>;
  }
  return (
    <Card
      raised={true}
      className="w-full h-44 overflow-scroll rounded-lg p-2 text-center shadow-4xl rounded-[20px]  flex flex-col justify-evenly items-center m-2"
    >
      {show ? (
          <div className="flex">
            <TextField
              InputProps={{
                value: editValue,
                onChange: (e) => {
                  setEditValue(e.target.value);
                },
              }}
            />
            <Button onClick={saveEdit}> Save</Button>
          </div>
        ) : (
     {author._id.toString() === user._id.toString() && (
              <div className="">
                <IconButton onClick={edit}>
                  {' '}
                  <MdEdit />
                </IconButton>
                <IconButton onClick={deletePost}>
                  <FaTrash />
                </IconButton>
              </div>
            )}
      <div
        className="flex justify-between align-center"
        onClick={() => navigate(`/users/${author._id}`)}
      >
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
        <div
          className="bg"
          onClick={() => navigate(`posts/${dPost._id}`)}
        >
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
        <Paper
          className="flex justify-center m-0 items-center bg h-28 p-2 w-[80%]"
          onClick={() => navigate(`posts/${dPost._id}`)}
        >
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
        >
          <IoChatbox onClick={commentOnPost} />
          {dPost.comments.length}
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
      )}
    </Card>
  );
};
export default Post;
