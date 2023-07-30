import React, { useEffect, useState } from 'react';
import { formatDate } from '../app/hooks';
import Loader from './loader';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Default from '../images/default.png';
import { IoThumbsUp, IoChatbox, IoRepeat } from 'react-icons/io5';
import { socket } from '../app/store';
import { useNotify } from '../app/hooks';
const Post = ({ post, token }) => {
  console.log('postComp', post.post);
  const [dPost, setPost] = useState(post.post);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [author, setAuthor] = useState(dPost.author);
  const [liked, setLiked] = React.useState(false);
  const [retweeted, setRetweeted] = React.useState(false);
  useEffect(() => {
    socket.on(`likedpost-${dPost._id}`, ({ post, user }) => {
      console.log(user);
      useNotify({
        userId: user._id,
        content: `${user.name} liked your post,${dPost.content.substring(
          0,
          10
        )}...`,
        token: user.token,
        authorId: dPost.author,
      });

      setLiked(true);
      setPost(post);
    });
    socket.on(`unlikedpost-${dPost._id}`, (post) => {
      setLiked(false);
      setPost(post);
    });
    socket.on(`retweetedpost-${dPost._id}`, ({ post, user }) => {
      useNotify({
        userId: user._id,
        content: `${user.name} retweeted your post,${dPost.content.substring(
          0,
          10
        )}...`,
        token: user.token,
        authorId: dPost.author,
      });

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
  if (!dPost) {
    return;
  }
  return (
    <Card
      raised={true}
      className="min-h-[20vw] h-auto overflow-scroll rounded-lg p-2 text-center shadow-4xl rounded-[20px]  flex flex-col justify-evenly items-center m-2 bg w-[95%]"
    >
      <div
        className="bg w-[90%] center justify-evenly p-4"
        onClick={() => navigate(`/users/${author._id}`)}
      >
        <img
          src={author.image || Default}
          alt={author.name}
          className="h-6 w-auto rounded-[50%] mr-2 bg"
        />
        <div className="mx-2">
          <Typography
            variant="body2"
            className="flex-grow-2 whitespace-nowrap mx-2"
          >
            {author.name}
          </Typography>
        </div>
        {dPost.date && (
          <Typography variant="body2">{formatDate(dPost.date)}</Typography>
        )}
      </div>

      {dPost.image && dPost.image !== null ? (
        <div
          className="bg w-full"
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
        <div
          className="flex justify-center m-0 items-center bg min-h-[15vw] h-auto p-2 w-full bg"
          onClick={() => navigate(`posts/${dPost._id}`)}
        >
          {dPost.content || ''}
        </div>
      )}
      <CardActions
        disableSpacing
        className=" rounded-lg p-2 text-center shadow-4xl rounded-[18px]  rounded-lg flex justify-evenly items-center h-4 m-0 bg w-full"
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
    </Card>
  );
};
export default Post;
