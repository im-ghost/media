import axios from "axios"
import Box from "@mui/material/Box";
import * as React from "react";
import {
  google,
  twitter
} from "../pages/auth/firebase";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaTwitter,
  } from 'react-icons/fa';
import { setUserSign,setUser } from "../features/user/userSlice"
import { useAppDispatch } from "../app/hooks"
const AuthProviders:React.FC<{
  isLogin:Boolean
}> = ({ isLogin }):JSX.Element =>{
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const _google = async (navigate:any) =>{
    const res = await google(navigate,isLogin);
    if(isLogin){
    const user = await axios.post("https://media-app-api-a06z.onrender.com/api/v1/users/ologin",{
      body:res.email
    })
  
   await dispatch(setUser(user.data))
   navigate("/")
    }
     await dispatch(setUserSign(res))
  }
  const _twitter = async (navigate:any) =>{
    const res = await twitter(navigate,isLogin);
    if(isLogin){
    const user = await axios.post("http://localhost:4000/api/v1/users/ologin",{
      body:res.email
    })
    await dispatch(setUser(user.data))
    navigate("/")
  }
   await dispatch(setUserSign(res))
  }
  return(
    <Box className="bg m-2 p-2 flex justify-center h-16 w-full align-center">
       <div className=" shadow-3xl border border-xl h-10 w-10 p-2  flex justify-center align-center text-center rounded-lg mx-2">
     <FaGoogle className="text-xl text-bold" onClick={()=>_google(navigate)} />
     </div>
        <div className="shadow-3xl border border-xl h-10 w-10 p-2 rounded-lg flex justify-center align-center text-center mx-2">
    <FaTwitter className="text-xl text-bold" onClick={()=>_twitter(navigate)}/>
        </div>
     </Box>
    )
}

export default AuthProviders;