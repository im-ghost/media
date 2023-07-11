import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import Post from './post';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../app/hooks';
import { setPostsInStore } from '../features/post/postSlice';
const Posts = ({ posts, token }) => {
  const [postsObj, setPosts] = useState(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let postIds = posts.filter((post) => post !== null); // Filter out null values
        postIds = posts.filter((post) => post !== undefined); // Filter out undefined values
        if (postIds.length > 0) {
          const resolvedPosts = await Promise.all(
            postIds.map(async (postId) => {
              try {
                const { data } = await axios.get(
                  `http://localhost:4000/api/v1/posts/post/${postId}`,
                  {
                    headers: {
                      authorization: token,
                    },
                  }
                );
                if (data) return data;
                else {
                  toast.error('No post available');
                  return undefined; // Return undefined when data is not available
                }
              } catch (error) {
                toast.error(JSON.stringify(error));
                return undefined; // Return undefined in case of an error
              }
            })
          );
          // Filter out undefined values from the resolvedPosts array
          const filteredPosts = resolvedPosts.filter(
            (post) => post !== undefined
          );
          setPosts(filteredPosts);

          return filteredPosts; // Return the filtered and resolved posts
        }
      } catch (error) {
        toast.error(JSON.stringify(error));
      }
    };
    if (posts) {
      fetchPosts();
    }
  }, [posts, dispatch, token]);
  if (posts.length < 1) {
    return (
      <Typography variant="body2"> This user doesn't have any post</Typography>
    );
  }
  return (
    <Container className="bg w-screen">
      {postsObj !== null &&
        postsObj.map((post) => (
          <Post
            post={post}
            token={token}
            key={post.post._id}
          />
        ))}
    </Container>
  );
};
export default Posts;
