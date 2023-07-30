import Comment from './comment';
import React from 'react';
import { Container } from '@mui/material';
const Comments = ({ comments, token, user }) => {
  return (
    <Container className="p-0 h-auto bg w-screen">
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
