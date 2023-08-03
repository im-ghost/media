import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import Post from './post';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPostsInStore,
  setPostsObjInStore,
  selectPostsObj,
} from '../features/post/postSlice';
import Loader from './loader';
const Posts = ({ posts, token }) => {
  const [postsObj, setPosts] = useState(null);
  const postsFromStore = useSelector(selectPostsObj);
  const dispatch = useDispatch();
  useEffect(() => {
    if (postsFromStore) {
      setPosts(postsFromStore);
    } else if (typeof posts[0] === 'object') {
      const dPosts = [];
      posts.map((post) => {
        dPosts.push({
          post: post,
        });
      });
      setPosts(dPosts);
    }
  }, [posts, dispatch, token]);
  if (!posts || posts === null) {
    return <Loader isPage={false} />;
  } else if (posts && posts !== null && posts.length < 1) {
    return (
      <Typography variant="body2"> This user doesn't have any post</Typography>
    );
  }
  return (
    <Container className="bg w-screen bg w-[100vw]">
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
