import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
const signInWithGoogle = () =>{}
const signInWithTwitter = () =>{}
const PhoneNumberInput = () => {
  const [num,setNum]= React.useState<number | string>("");
  const [isButtonDisabled,setButton] = React.useState<Boolean>(false)
  
const sendCode = (num:any) =>{
  setButton(true)
  setTimeout(()=>{
    setButton(false)
  },10000)
}
  return(
    <Box>
    <TextField 
    label = "phone number "
    placeholder = "Input Phone number"
    InputProps= {{
      value:num,
      onChange:(e:React.ChangeEvent<HTMLInputElement>)=> setNum(e.target.value)
    }}/>
    <Button onClick={()=>sendCode(num)} disabled={isButtonDisabled}> Send Code </Button>
     </Box>
    )
}
const EmailInput = () => {
  const [email,setEmail]= React.useState<string>("");
  const [isButtonDisabled,setButton] = React.useState<Boolean>(false)
  
const sendLink = (email:string) =>{
  setButton(true)
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
     <Button className="" variant="contained" onClick={()=>signInWithGoogle}>
      <Typography variant="h4">Sign In With Google</Typography>
     </Button>
     <Button className="" variant="contained" onClick={()=>signInWithTwitter}>
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