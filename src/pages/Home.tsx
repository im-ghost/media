import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/store";
import type { USER } from "../app/types";
import Navbar from "../components/HomePageNavbar";
import { toast } from "react-toastify";
import Posts from "../components/posts";
import { useAllUsersQuery } from "../features/user/userApiSlice";

const Home = () => {
  const userFromStore = useAppSelector((state) => state.user.userInfo);
  const [posts, setPosts] = useState<string[]>([]);
// ts-ignore
  const { data, error } = useAllUsersQuery(); // Call the hook directly

  useEffect(() => {
    if (data) {
      const fetchedPosts: string[] = data.reduce((acc: string[], user: USER) => {
        if (user.posts) {
          acc.push(...user.posts);
        }
        return acc;
      }, []);

      if (fetchedPosts.length > 0) {
        setPosts(fetchedPosts);
      }
    } else {
      toast.error(JSON.stringify(error));
    }
  }, [data, error]);

  return (
    <div>
      <Navbar user={userFromStore} />
      {posts.length > 0 && <Posts posts={posts} />}
      <Outlet />
    </div>
  );
};

export default Home;
