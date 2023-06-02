import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
import type { USER } from "../app/types";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import Posts from "../components/posts";
import { useAllUsersQuery } from "../features/user/userApiSlice";

const Home = () => {
  const userFromStore = useAppSelector((state) => state.user.userInfo);
  const [posts, setPosts] = useState<string[]>([]);
  const navigate = useNavigate();
  const { data, error } = useAllUsersQuery(userFromStore?.token);

  useEffect(() => {
   
   
    if (userFromStore?.token) {
    
      if (data) {
        const fetchedPosts: string[] = data.users.reduce((acc: string[], user: USER) => {
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
    }
  }, [data, error, userFromStore]);

  useEffect(() => {
    if (!userFromStore || !userFromStore.token) {
      navigate("/login");
    }
  }, [userFromStore, navigate]);
if(userFromStore && userFromStore !== null && userFromStore.token){
  return (
    <div>
      {posts.length > 0 && <Posts posts={posts}  token={userFromStore.token}/>}
      <Footer />
      <Outlet />
    </div>
  );
}
return (
  <h1 onClick={()=>navigate("/login")}>Login</h1>
  )
};

export default Home;
