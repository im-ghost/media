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

import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import { useGetUserByIdQuery } from '../features/user/userApiSlice';
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useCommentOnPostMutation,
  useRetweetPostMutation,
  useUnretweetPostMutation,
} from '../features/post/postApiSlice';
import { toast } from 'react-toastify';
import Default from '../images/default.png';
import { IoThumbsUp, IoChatbox, IoRepeat } from 'react-icons/io5';
const Post = ({ post, token }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [like] = useLikePostMutation();
  const [unlike] = useUnlikePostMutation();
  const [comment] = useCommentOnPostMutation();
  const [retweet] = useRetweetPostMutation();
  const [unretweet] = useUnretweetPostMutation();
  const [liked, setLiked] = React.useState(false);
  const [retweeted, setRetweeted] = React.useState(false);
  useEffect(() => {
    const likes = post.post.likes;
    console.log(likes);
    console.log(user._id);
    if (likes.includes(user._id)) {
      console.log(true);
      setLiked(true);
    }
  }, [user]);
  const retweetPost = async () => {
    console.log(post.post.retweets.includes(user._id));
    if (post.post.retweets.includes(user._id)) {
      try {
        const res = await unretweet({
          postId: post.post._id,
          token: token,
        });
        setRetweeted(false);
        posts.posts.retweets.filter((id) => id !== user._id);
      } catch (e) {
        toast.error(JSON.stringify(e));
      }
    } else {
      try {
        const res = await retweet({
          postId: post.post._id,
          token: token,
        });
        setRetweeted(true);
        posts.posts.retweets.push(user._id);
      } catch (e) {
        toast.error(JSON.stringify(e));
      }
    }
  };
  const commentOnPost = async () => {
    if (post.post._id) {
      navigate(`posts/${post.post._id}`);
    }
  };
  const likePost = async () => {
    if (post.post.likes.includes(user._id)) {
      try {
        const res = await unlike({
          postId: post.post._id,
          token: token,
        });
        setLiked(false);
        post.post.likes.filter((id) => id !== user._id);
      } catch (e) {
        toast.error(JSON.stringify(e));
      }
    } else {
      try {
        const res = await like({
          postId: post.post._id,
          token: token,
        });
        setLiked(true);
        post.post.likes.push(user._id);
      } catch (e) {
        toast.error(JSON.stringify(e));
      }
    }
  };
  const userId = post.post.author;
  const { data, error } = useGetUserByIdQuery({ userId, token });
  useEffect(() => {
    if (error) {
      console.log(error);
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
      <div className="flex justify-between align-center">
        <img
          src={author.image || Default}
          alt={author.name}
          className="h-8 w-auto rounded-[50%] mx-4"
        />

        <Typography variant="body1">{author.name}</Typography>
      </div>
      {post.post.date && (
        <Typography variant="body2">{post.post.date.toString()}</Typography>
      )}

      {post.post.image && post.post.image !== null ? (
        <div className="bg">
          <CardMedia
            component="img"
            height="194"
            image={post.post.image || ''}
            alt={post.post.content || ''}
            className="bg m-0"
          />
          <CardContent className="bg m-0">
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {post.post.caption || ''}
            </Typography>
          </CardContent>
        </div>
      ) : (
        <Paper className="flex justify-center m-0 items-center bg h-28 p-2 w-[80%]">
          {post.post.content || ''}
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
          {post.post.likes.length}{' '}
        </IconButton>
        <IconButton
          className="bg"
          aria-label="comment"
        >
          <IoChatbox onClick={commentOnPost} />
          {post.post.comments.length}
        </IconButton>
        <IconButton
          className="bg"
          aria-label="retweet"
        >
          <IoRepeat
            className={retweeted ? 'text-red-900' : ''}
            onClick={retweetPost}
          />{' '}
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default Post;
