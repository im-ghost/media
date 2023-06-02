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
    return <h1>Loading</h1>;
  }

  return (
    <Card className="w-[95vw] h-[33vh] m-2 overflow-scroll">
      <CardHeader avatar={<img src={author.image || Default} alt={author.name} className="h-[15vh] w-auto rounded-lg"/>} title={author.name} subheader={post.post.date ? <h3>{post.post.date.toString()}</h3> : ""} />
      {post.post.image ? (
        <>
          <CardMedia component="img" height="194" image={post.post.image || ""} alt={post.post.content || ""} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.post.caption || ""}
            </Typography>
          </CardContent>
        </>
      ) : (
        <Paper className="flex justify-center items-center p-2">{post.post.content || ""}</Paper>
      )}
      <CardActions disableSpacing>
        <IconButton aria-label="like">Like</IconButton>
        <IconButton aria-label="comment">Comment</IconButton>
        <IconButton aria-label="retweet">Retweet</IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
