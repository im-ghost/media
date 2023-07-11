import { Card, Typography, IconButton,TextField,Button} from '@mui/material';
import React from 'react';
import { socket } from '../app/store';
import { IoThumbsUp } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import Helper from './chelper';
import { toast } from 'react-toastify';
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useGetCommentByIdQuery,
} from '../features/post/postApiSlice';
const Comment = ({ comment, token, user }) => {
  const { data, error } = useGetCommentByIdQuery(comment);
  const [com, setComment] = React.useState();
  const [author, setAuthor] = React.useState();
  const [show, setShow] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [editValue, setEditValue] = React.useState('');
  React.useEffect(() => {
    if (data) {
      setComment(data.comment);
      setEditValue(data.content);
    }
    if (error) {
      toast.error(JSON.stringify(error));
    }
  }, [data, error]);
  const [update, { error: editError, data: editData }] =
    useUpdateCommentMutation();
  const [del, { error: delError, data: delData }] = useDeleteCommentMutation();
  const deleteComment = async () => {
    const commentId = com._id;
    await del({
      commentId: commentId,
      token: token,
    });
  };
  const edit = async () => {
    setShow(true);
  };
  const saveEdit = async () => {
    const commentId = com._id;
    await update({
      commentId: commentId,
      token: token,
      content: editValue,
    });
  };
  const likeComment = () => {
    if (com.likes.includes(user._id)) {
      socket.emit('unlikecomment', {
        userId: user._id,
        commentId: com._id,
      });
    } else {
      socket.emit('likecomment', {
        userId: user._id,
        commentId: com._id,
      });
    }
  };
  React.useEffect(() => {
    if (com) {
      socket.on(`likedcomment-${com._id}`, (comment) => {
        setLiked(true);
        setComment(comment);
      });
      socket.on(`unlikedcomment-${com._id}`, (comment) => {
        setLiked(false);
        setComment(comment);
      });
      socket.on('error', () => {
        toast.error('An error occured');
      });
    }
  }, []);
  React.useEffect(() => {
    if (com) {
      const likes = com.likes;
      if (likes.includes(user._id)) {
        setLiked(true);
      }
    }
  }, [user]);
  React.useEffect(() => {
    if (editError) {
      toast.error("Couldn't update comment ");
    }
    if (editData) {
      setComment(editData);
    }
  }, [editError, editData]);
  React.useEffect(() => {
    if (delError) {
      toast.error("Couldn't delete comment ");
    }
    if (delData) {
      setComment(undefined);
    }
  }, [delError, delData]);
  if (com) {
    return (
      <Card className="">
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
          <div className="relative">
            {com.author.toString() === user._id.toString() && (
              <div className="">
                <IconButton onClick={edit}>
                  {' '}
                  <MdEdit />
                </IconButton>
                <IconButton onClick={deleteComment}>
                  <FaTrash />
                </IconButton>
              </div>
            )}
            <Helper authorId={com.author.toString()} />
            <Typography variant="body1">{com.content}</Typography>
            <IconButton
              className="bg"
              aria-label="like"
            >
              <IoThumbsUp
                onClick={likeComment}
                className={liked ? 'text-red-900' : ''}
              />
              {com.likes.length}{' '}
            </IconButton>
          </div>
        )}
      </Card>
    );
  }
  return;
};

export default Comment;
