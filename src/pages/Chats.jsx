import { Helmet } from 'react-helmet';
import ChatsList from '../components/chatsList';
import Container from '@mui/material/Container';
import Add from '../components/Add';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import React from 'react';
const Chats = () => {
  const user = useSelector(selectUser);
  if (user) {
    return (
      <div className="bg">
        <Helmet>
          <title> Chats Lists </title>
        </Helmet>
        <Container className="bg min-h-full h-auto w-screen p-2 m-0">
          <ChatsList user={user} />
          <Add isCreatPost={false} />
        </Container>
      </div>
    );
  }
  return;
};

export default Chats;
