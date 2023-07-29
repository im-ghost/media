import { Helmet } from 'react-helmet';
import { Container } from '@mui/material';
import ChatsList from '../components/chatsList';
import Add from '../components/Add';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import React from 'react';
const Chats = () => {
  const user = useSelector(selectUser);
  if (user) {
    return (
      <>
        <Helmet>
          <title> Chats Lists </title>
        </Helmet>
        <Container className="bg">
          <ChatsList user={user} />
          <Add isCreatPost={false} />
        </Container>
      </>
    );
  }
  return;
};

export default Chats;
