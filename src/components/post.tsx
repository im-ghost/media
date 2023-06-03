import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Paper, IconButton } from "@mui/material";

import type { USER, POST } from "../app/types";
import { useGetUserByIdQuery } from "../features/user/userApiSlice";
import { toast } from "react-toastify"
import Default from "../images/default.png";

const Post = ({ post,token }: { post: { post:POST },token:string}) => {
  
  const userId = post.post.author;
  const { data, error } = useGetUserByIdQuery({userId,token});

  useEffect(() => {
    if (error) {
      console.log("post comp ")
      console.log(error);
      toast.error(JSON.stringify(error))
    }
  }, [error]);

  const [author, setAuthor] = useState<USER | null>(null);

  useEffect(() => {
    if (data) {
      setAuthor(data);
    }
  }, [data]);

  if (!data || !author) {
    return <h1>Loading....</h1>;
  }
  return (
    <Card raised={true} className="w-full h-44 overflow-scroll bg rounded-lg p-2">
      <CardHeader className="bg h-8 m-0" avatar={<img src={author.image || Default} alt={author.name} className="h-8 w-auto rounded"/>} title={author.name} subheader={post.post.date ? (
      <div>
      <h1>{author.name}</h1>
      <h3>{post.post.date.toString()}</h3>
      </div>) : ""} />
      {post.post.image ? (
        <div className="bg">
          <CardMedia component="img" height="194" image={post.post.image || ""} alt={post.post.content || ""} className="bg m-0" />
          <CardContent  className="bg m-0">
            <Typography variant="body2" color="text.secondary">
              {post.post.caption || ""}
            </Typography>
          </CardContent>
        </div>
      ) : (
        <Paper className="flex justify-center m-0 items-center bg h-28 p-2">{post.post.content || ""}</Paper>
      )}
      <CardActions disableSpacing  className="bg h-4 m-0">
        <IconButton  className="bg" aria-label="like">Like</IconButton>
        <IconButton  className="bg" aria-label="comment">Comment</IconButton>
        <IconButton  className="bg" aria-label="retweet">Retweet</IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
