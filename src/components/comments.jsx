import Comment from './comment';
import React from 'react';
import { Container } from '@mui/material';
const Comments = ({ comments, token, user }) => {
  return (
    <Container className="p-2 h-auto bg">
      {comments.map((comment) => (
        <Comment
          comment={comment}
          token={token}
          user={user}
        />
      ))}
    </Container>
  );
};

export default Comments;
