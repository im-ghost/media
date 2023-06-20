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
import { useNavigate } from "react-routet-dom";
const PhoneNumberInput = () => {
  const navigate= useNavigate()
  const [num,setNum]= React.useState<number | string>("");
  const [isButtonDisabled,setButton] = React.useState<Boolean>(false)
  const [code,setCode]= React.useState<number | string>("");
const sendCode = async (num:any) =>{
  setButton(true)
 
  await phone(num)
   setCodeInput(true)
  setTimeout(()=>{
    setButton(false)
  },10000)
}
const verify = (code:any) =>{
  setButton(true)
  const res = verifyPhone(code)
  if(typeof res === "string") navigate("/register2")
  else toast.error(JSON.stringigy(res))
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
  const [isButtonDisabled,setButton] = React.useState<Boolean>(false)
  
const sendLink = (email:string) =>{
  setButton(true)
  emailLink(email)
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
      value:num,
      onChange:(e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)
    }}/>
    <Button onClick={()=>sendLink(email)} disabled={isButtonDisabled}> Send Code </Button>
     </Box>
    )
}
const RegButtons:React.FC = ():JSX.Element =>{ 
  const [phone,setPhone] = useState(false)
  const [email,setEmail] = useState(false)
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
     }}>
      <Typography variant="h4">Sign In With Phone Number</Typography>
     </Button>
     <Button className="" variant="contained" onClick={()=>{
       setEmail(true)
     }}>
      <Typography variant="h4">Sign In With Emailr</Typography>
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