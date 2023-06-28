import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
import {
  google,
  twitter
} from "../pages/auth/firebase";
import { useNavigate } from "react-router-dom";
import {
  toast
} from "react-toastify"

import { setUserSign } from "../features/user/userSlice"
import { useAppDispatch } from "../app/hooks"
const AuthProviders:React.FC = ():JSX.Element =>{
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const _google = async (navigate:any) =>{
    const res = await google(navigate);
   await dispatch(setUserSign(res))
   
  }
  const _twitter = async (navigate:any) =>{
    const res = await twitter(navigate);
   await dispatch(setUserSign(res))
    
  }
  return(
    <Box className="bg m-2 p-2">
       <div className="p-2 m-2">
     <Button className="bg p-2 my-2" variant="contained" onClick={()=>_google(navigate)}>
      <Typography variant="h6">Sign In With Google</Typography>
     </Button>
     </div>
        <div className="p-2 m-2">
     <Button className="bg p-2 my-2" variant="contained" onClick={()=>_twitter(navigate)}>
      <Typography variant="h6">Sign In With Twitter</Typography>
     </Button>
        </div>
     </Box>
    )
}

export default AuthProviders;