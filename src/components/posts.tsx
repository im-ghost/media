import React, { FC, useState, useEffect } from "react";
import { Container } from "@mui/material";
import Post from "./post";
import axios from "axios"
import type { POSTS, POST } from "../app/types";
import { toast } from "react-toastify";
import { useGetPostByIdQuery } from "../features/post/postApiSlice";

const Posts: FC<{ posts: (string | null)[] }> = ({ posts }) => {
  const [postsObj, setPosts] = useState<POST[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
  try {
    const postIds = posts.filter((post) => post !== null) as string[]; // Filter out null values
    if (postIds.length > 0) {
      const resolvedPosts: (POST| undefined) [] = await Promise.all(
        postIds.map(async (postId) => {
          try {
            const { data } = await axios.get(`http://localhost:4000/api/v1/posts/post/${postId}`)
            if (data) return data;
            else {
              toast.error("No post available");
              return undefined; // Return undefined when data is not available
            }
          } catch (error:any) {
            toast.error(JSON.stringify(error));
            return undefined; // Return undefined in case of an error
          }
        })
      );

      // Filter out undefined values from the resolvedPosts array
      const filteredPosts = resolvedPosts.filter((post) => post !== undefined) as POST[];

      setPosts(filteredPosts);
      return filteredPosts; // Return the filtered and resolved posts
    } else {
      toast.error("Couldn't get post ids");
    }
  } catch (error:any) {
   toast.error(JSON.stringify(error));
  }
};

    if (posts) {
      fetchPosts();
    }
  }, [posts]);

  return (
    <Container className="w-screen">
      {postsObj !== null &&
        postsObj.map((post: POST) => <Post post={post} key={post._id} />)}
    </Container>
  );
};

export default Posts;
