import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
import {
  google,
  phone,
  verifyPhone,
  twitter,
  emailLink
} from "../pages/auth/firebase";
import { useNavigate } from "react-router-dom";
import {
  toast
} from "react-toastify"
const PhoneNumberInput = () => {
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
const verify = (code:any) =>{
  setButton(true)
  const res = verifyPhone(num,code,result)
  if(typeof res === "string") navigate("/register2")
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
    <Box>
    <div id="recaptcha-container"></div>
   
    <TextField 
    label = "Code"
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
    <Box>
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

const EmailInput = () => {
  const [email,setEmail]= React.useState<string>("");
  const [isButtonDisabled,setButton] = React.useState<boolean >(false)
  
const sendLink = async (email:string) =>{
  setButton(true)
  await emailLink(email)
  setTimeout(()=>{
    setButton(false)
  },10000)
}
  return(
    <Box>
    <TextField 
    label = "Email Addres"
    placeholder = "culestfrosh@gmail.com"
    InputProps= {{
      value:email,
      onChange:(e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)
    }}/>
    <Button onClick={()=>sendLink(email)} disabled={isButtonDisabled}> Send Link </Button>
     </Box>
    )
}
const RegButtons:React.FC = ():JSX.Element =>{ 
  const [phone,setPhone] = React.useState(false)
  const [email,setEmail] = React.useState(false)
  return(
    <Box className="">
     <Button className="" variant="contained" onClick={()=>google()}>
      <Typography variant="h4">Sign In With Google</Typography>
     </Button>
     <Button className="" variant="contained" onClick={()=>twitter()}>
      <Typography variant="h4">Sign In With Twitter</Typography>
     </Button>
     <Button className="" variant="contained" onClick={()=>{
       setPhone(true)
       setEmail(false)
     }}>
      <Typography variant="h4">Sign In With Phone Number</Typography>
     </Button>
     <Button className="" variant="contained" onClick={()=>{
       setEmail(true)
       setPhone(false)
     }}>
      <Typography variant="h4">Sign In With Email Link</Typography>
     </Button>
     {
       phone && ( <PhoneNumberInput />)
     }
     {
       email && ( <EmailInput /> )
     }
    </Box>
    )
}
export default RegButtons