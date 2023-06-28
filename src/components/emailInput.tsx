import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
import {  emailLink } from "../pages/auth/firebase";

import { setUserSign } from "../features/user/userSlice"
import { useAppDispatch } from "../app/hooks"
const EmailInput = () => {
  const dispatch= useAppDispatch()
  const [email,setEmail]= React.useState<string>("");
  const [isButtonDisabled,setButton] = React.useState<boolean >(false)
  const [isDone,setDone] = React.useState<boolean >(false)
  
const sendLink = async (email:string) =>{
  setButton(true)
  dispatch(setUserSign({email:email}))
  await emailLink(email)
  setDone(true)
  setTimeout(()=>{
    setButton(false)
  },10000)
}
if(isDone){
  return(
    <Box className="bg">
     <Typography variant="h6"> A confirmation link has been sent to your email,click on the link to continue</Typography>
    </Box>
    )
}
  return(
    <Box className="bg m-2">
    <TextField 
      className="m-2"
    label = "Email Address"
    placeholder = "culestfrosh@gmail.com"
    InputProps= {{
      value:email,
      onChange:(e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)
    }}/>
    <Button onClick={()=>sendLink(email)} disabled={isButtonDisabled}> Send Link </Button>
     </Box>
    )
}

export default EmailInput