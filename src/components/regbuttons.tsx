import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import  AuthProviders from "./oauthInput"
import EmailInput from "./emailInput";
import PhoneNumberInput from "./phoneInput"
const RegButtons:React.FC = ():JSX.Element =>{ 
  const [phone,setPhone] = React.useState(false)
  const [phoneBtn,setPhoneBtn] = React.useState(true)
  const [email,setEmail] = React.useState(false)
  const [emailbtn,setEmailBtn] = React.useState(true)
  const [oauth,setOauth] = React.useState(true)
  return(
    <Box className="bg">
    { oauth && <AuthProviders isLogin={false} /> }
    <div className="p-2 m-2">
    <Typography variant='h6'> OR </Typography>
   { phoneBtn &&  <Button className="" variant="contained" onClick={()=>{
       setPhone(true);
       setEmail(false);
       setOauth(false);
       setPhoneBtn(false)
       setEmailBtn(false)
     }}>
      <Typography variant="h6">Sign In With Contact</Typography>
     </Button> }
     </div>
        <div className="p-2 m-2">
    { emailbtn &&  <Button className="" variant="contained" onClick={()=>{
       setEmail(true);
       setPhone(false);
       setOauth(false);
        setPhoneBtn(false)
       setEmailBtn(false)
     }}>
      <Typography variant="h6">Sign In With Email Link</Typography>
     </Button> }
     </div>
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