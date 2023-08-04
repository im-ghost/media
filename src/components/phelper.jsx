import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Default from '../images/default.png';
import Loader from './loader';
import { useNotify } from '../app/hooks';
import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import Comments from './comments';
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
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from '../features/post/postApiSlice';
import { selectUser } from '../features/user/userSlice';
import { socket } from '../app/store';
import { IoThumbsUp, IoChatbox, IoRepeat } from 'react-icons/io5';

const Helper = ({ post }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [dPost, setPost] = useState(post.post);
  const [comment, setComment] = useState('');

  const [update, { data: updateData, error: updateError }] =
    useUpdatePostMutation();
  const [del, { data: delData, error: delError }] = useDeletePostMutation();
  const [editValue, setEditValue] = React.useState('');
  const [show, setShow] = React.useState(false);
  const user = useSelector(selectUser);
  const [author, setAuthor] = useState(null);

  const [liked, setLiked] = React.useState(false);
  const [retweeted, setRetweeted] = React.useState(false);
  useEffect(() => {
    if (dPost) {
      setEditValue(dPost.content);
    }
  }, [dPost]);
  useEffect(() => {
    if (dPost && user._id) {
      socket.on(`likedpost-${dPost._id}`, ({ post, user }) => {
        useNotify({
          userId: user._id,
          content: `${user.name} liked your post,${
            dPost.content.length > 15
              ? dPost.content.substring(0, 15) + '...'
              : dPost.content
          }`,
          token: user.token,
          authorId: dPost.author,
          postId: dPost._id,
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
          content: `${user.name} retweeted your post,${
            dPost.content.length > 15
              ? dPost.content.substring(0, 15) + '... '
              : dPost.content
          }`,
          token: user.token,
          authorId: dPost.author,
          postId: dPost._id,
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
      socket.on(`commentedonpost-${dPost._id}`, ({ post, user }) => {
        useNotify({
          userId: user._id,
          content: `${user.name} commented on  your post,${
            dPost.content.length > 15
              ? dPost.content.substring(0, 15) + '...'
              : dPost.content
          }`,
          token: user.token,
          authorId: dPost.author,
          postId: dPost._id,
        });

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

  const edit = () => {
    setShow(true);
  };
  const saveEdit = async () => {
    setShow(false);
    const post = await update({
      postId: dPost._id,
      userId: user._id,
      token: user.token,
      data: {
        ...dPost,
        content: editValue,
      },
    });
  };
  const deletePost = async () => {
    await del({
      token: user.token,
      postId: dPost._id,
      userId: user._id,
    });
  };
  useEffect(() => {
    if (updateData) {
      setPost(updateData.post);
    }
    if (updateError) {
      toast.error(JSON.stringify(updateError));
    }
  }, [updateData, updateError]);
  useEffect(() => {
    if (delData) {
      setPost();
    }
    if (delError) {
      toast.error(JSON.stringify(delError));
    }
  }, [delData, delError]);
  const userId = dPost.author;
  const { data, error } = useGetUserByIdQuery(userId);
  useEffect(() => {
    if (data) {
      console.log(data);
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
    return <h1 className="header"> Post not found </h1>;
  }
  if (!author) {
    return <Loader isPage={true} />;
  }
  if (!dPost) {
    return;
  }
  if (show) {
    return (
      <div className="flex bg">
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
    );
  }
  return (
    <>
      <Helmet>
        <title>
          {' '}
          {dPost.content
            ? `${dPost.content.substring(0, 15)}...`
            : dPost.caption}
        </title>
      </Helmet>
      <div className="h-full w-screwn bg">
        <Card className="min-h-[20vw] h-auto overflow-scroll rounded-lg p-2 text-center shadow-4xl rounded-[20px]  flex flex-col justify-evenly items-center m-2 bg w-[95%] bg">
          <div className="flex bg justify-evenly w-[90%]">
            <img
              src={author.image || Default}
              alt={author.name}
              className="h-6 w-auto rounded-[50%]"
            />

            <Typography
              variant="body2"
              className="flex-grow-2 whitespace-nowrap"
            >
              {author.name}
            </Typography>
            {author._id.toString() === user._id.toString() && (
              <div className="flex bg w-[7vw]">
                <IconButton
                  className="bg"
                  onClick={edit}
                >
                  {' '}
                  <MdEdit className="bg text-sm" />
                </IconButton>
                <IconButton
                  onClick={deletePost}
                  className="bg"
                >
                  <FaTrash className="text-sm bg" />
                </IconButton>
              </div>
            )}
          </div>

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
            <Paper className="flex justify-center m-0 items-center bg p-2 w-[80%] bg min-h-[15vw] h-auto bg">
              {dPost.content || ''}
            </Paper>
          )}
          <div className="m-4">
            {dPost.date && (
              <Typography variant="body2">
                Posted {dPost.date.toString()}
              </Typography>
            )}
          </div>
          <CardActions
            disableSpacing
            className=" rounded-lg p-2 text-center shadow-4xl rounded-[18px]  rounded-lg flex justify-evenly items-center h-4 m-0 bg"
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
          <Comments
            comments={dPost.comments}
            token={user.token}
            user={user}
          />
        </Container>
        <Container className="absolute bottom-0 flex z-[10] mt-8 bgg">
          <TextField
            InputProps={{
              value: comment,
              onChange: (e) => setComment(e.target.value),
            }}
          />
          <Button onClick={commentOnPost}>Send</Button>
        </Container>
      </div>
    </>
  );
};

export default Helper;
