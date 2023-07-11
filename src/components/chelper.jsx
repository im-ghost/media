import { useGetUserByIdQuery } from "../features/user/userApiSlice"
import {
  Typography
} from "@mui/material"
import React,{
  useState,
  useEffect
} from "react"
export default function Helper({authorId}){
  const [author,setAuthor] = useState()
  const {data,error} = useGetUserByIdQuery(authorId);
  useEffect(()=>{
    if(data){
      setAuthor(data.user)
      console.log(data.user);
    }
    if(error){
      toast.error(JSON.stringify(error))
    }
  },[data,error])
  if(author){
  return(
    <div
        className="flex justify-evenly align-center"
        onClick={() => navigate(`/users/${author._id}`)}
      >
        <img
          src={author.image}
          alt={author.name}
          className="h-8 w-auto rounded-[50%] mx-4"
        />

        <Typography variant="h6">{author.name}</Typography>
      </div>
    )
  }
  return <Typography variant="body2">Loading...</Typography>
}