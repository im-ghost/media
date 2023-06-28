import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
import {
  phone,
  verifyPhone
} from "../pages/auth/firebase";
import { useNavigate } from "react-router-dom";
import {
  toast
} from "react-toastify";
import { setUserSign } from "../features/user/userSlice"
import {
  useAppDispatch
} from "../app/hooks"
const PhoneNumberInput = () => {
  const dispatch= useAppDispatch()
  const navigate= useNavigate()
  const [num,setNum]= React.useState<number | string>("");
  const [result,setResult]= React.useState<any>();
  const [codeInput,setCodeInput] = React.useState<boolean >(false)
  const [isButtonDisabled,setButton] = React.useState<boolean >(false)
  const [code,setCode]= React.useState<number | string>("");
const sendCode = async (num:any) =>{
  setButton(true)
 
 const confirmationResult = await phone(num)
 setResult(confirmationResult)
   setCodeInput(true)
  setTimeout(()=>{
    setButton(false)
  },10000)
}
const verify = async (code:any) =>{
  setButton(true)
  const res = await verifyPhone(num,code,result)
  if(typeof res === "string") {
  
   await dispatch(setUserSign({ num :num}))
  
    navigate("/register2")}
  else {
    toast.error(JSON.stringify(res));
    setCodeInput(false)
  }
  setTimeout(()=>{
    setButton(false)
  },10000)
}
if(codeInput){
  return(
    <Box className="bg m-2">
    <div id="recaptcha-container"></div>
   <Typography variant="h6">
   A code has been sent to {num} , input the code below to continue with your registration 
   </Typography>
   
    <TextField 
    label = "Code"
    className="m-2"
    placeholder = "Input the OTP sent"
    InputProps= {{
      value:code,
      onChange:(e:React.ChangeEvent<HTMLInputElement>)=> setCode(e.target.value)
    }}/>
    <Button onClick={()=>verify(code)} disabled={isButtonDisabled}> Verify </Button>
     </Box>
    )
}
  return(
    <Box className="bg">
    <div id="recaptcha-container"></div>
    <TextField 
    label = "phone number "
    placeholder = "Input Phone number"
    InputProps= {{
      value:num,
      onChange:(e:React.ChangeEvent<HTMLInputElement>)=> setNum(e.target.value)
    }}/>
    <Button onClick={()=>sendCode(num)} > Send Code </Button>
     </Box>
    )
}
export default PhoneNumberInput