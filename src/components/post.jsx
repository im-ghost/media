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
import { useGetUserByIdQuery } from '../features/user/userApiSlice';
import {
  useLikePostMutation,
  useCommentOnPostMutation,
  useRetweetPostMutation,
} from '../features/post/postApiSlice';
import { toast } from 'react-toastify';
import Default from '../images/default.png';
//import { IoThumbsUp, IoChatbox, IoRepeat } from 'react-icons/io5';
const Post = ({ post, token }) => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [like] = useLikePostMutation();
  const [comment] = useCommentOnPostMutation();
  const [retweet] = useRetweetPostMutation();
  const [liked, setLiked] = React.useState(false);
  const [retweeted, setRetweeted] = React.useState(false);
  const retweetPost = async () => {
    try {
      const res = await retweet({
        postId: post.post._id,
        token: token,
      });
      setRetweeted(true);
    } catch (e) {
      toast.error(JSON.stringify(e));
    }
  };
  const commentOnPost = async () => {
    if (post.post._id) {
      navigate(`posts/${post.post._id}`);
    }
  };
  const likePost = async () => {
    try {
      const res = await like({
        postId: post.post._id,
        token: token,
      });
      setLiked(true);
    } catch (e) {
      toast.error(JSON.stringify(e));
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
      className="w-full h-44 overflow-scroll rounded-lg p-2 text-center shadow-4xl rounded-[18px]  ounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-40% to-emerald-500 to-100%  dark:from-blue-700 dark:from-20% dark:via-emarald-700 dark:via-30% dark:to-ryan-700 dark:to-100% dark:text-amber-500 text-amber-800  flex flex-col justify-evenly items-center"
    >
      <CardHeader
        className="overflow-scroll rounded-lg p-2 text-center shadow-4xl rounded-[18px]  ounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-40% to-emerald-500 to-100%  dark:from-blue-700 dark:from-20% dark:via-emarald-700 dark:via-30% dark:to-ryan-700 dark:to-100% dark:text-amber-500 text-amber-800  flex flex-col justify-evenly items-center"
        avatar={
          <img
            src={author.image || Default}
            alt={author.name}
            className="h-8 w-auto rounded"
          />
        }
        title={author.name}
        subheader={
          post.post.date ? (
            <div>
              <Typography variant="h5">{author.name}</Typography>
              <Typography variant="body2">
                {post.post.date.toString()}
              </Typography>
            </div>
          ) : (
            ''
          )
        }
      />
      {post.post.image ? (
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
        <Paper className="flex justify-center m-0 items-center bg h-28 p-2">
          {post.post.content || ''}
        </Paper>
      )}
      <CardActions
        disableSpacing
        className="overflow-scroll rounded-lg p-2 text-center shadow-4xl rounded-[18px]  rounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-40% to-emerald-500 to-100%  dark:from-blue-700 dark:from-20% dark:via-emarald-700 dark:via-30% dark:to-ryan-700 dark:to-100% dark:text-amber-500 text-amber-800  flex flex-col justify-evenly items-center h-4 m-0"
      >
        <IconButton
          className="bg"
          aria-label="like"
        >
          {/*  <IoThumbsUp onClick={likePost} className={liked ? "bg-red-900" : ""}/>*/}{' '}
          b
        </IconButton>
        <IconButton
          className="bg"
          aria-label="comment"
        >
          {/*   <IoChatbox onClick={commentOnPost}/>*/} A
        </IconButton>
        <IconButton
          className="bg"
          aria-label="retweet"
        >
          {/*<IoRepeat className={retweeted ? "bg-red-900" : ""} onClick={retweetPost}/>*/}{' '}
          R
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default Post;
