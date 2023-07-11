import { useGetUserByIdQuery } from "../features/user/userApiSlice"
import {
  Typography
} from "@mui/material"
import React,{
  useState,
  useEffect
} from "react"
export default function Helper({authorId}){
  const [author,setAuthor] = useState(null)
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
        className="flex w-3/4 items-center"
        onClick={() => navigate(`/users/${author._id}`)}
      >
        <img
          src={author.image}
          alt={author.name}
          className="h-6 w-auto rounded-[50%] mr-2"
        />

        <Typography variant="body2" className="flex-grow-2 whitespace-nowrap">{author.name}</Typography>
          
      </div>
    )
  }
  return <Typography variant="body2">Loading...</Typography>
}