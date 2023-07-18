import { Helemt } from "react-helmet";
import {
  Container
} from "@mui/material";
import ChatsList from "../components/chatsList";
import Add from "../components/Add";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userslice";
import React from "react";
const Chats = () => {
  const user = useSelector(selectUser);
  if(user){
  return(
    <>
    <Helemt>
     <title> Chats Lists </title>
    </Helemt>
    <Container className="">
     <ChatsList user={user}/>
     <Add isCreatPost={false}/>
    </Container>
    </>
    )
  }
  return
}

export default Chats;