
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
    <Box className="text-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-40% to-emerald-500 to-100%  dark:from-blue-700 dark:from-20% dark:via-emarald-700 dark:via-30% dark:to-ryan-700 dark:to-100% dark:text-amber-500 text-amber-800 p-2">
     { oauth && ( <Typography variant="body2">Sign in with:</Typography>) }
    { oauth && (
      <>
    
      <AuthProviders isLogin={false} /> 
      </>
      )}
    <div className="p-2 m-2">
   { oauth && (<Typography variant="h6"> OR </Typography>)}
   { phoneBtn &&  <div className="text-center shadow-4xl rounded-[8px]  p-2 w-[50vw] h-[6vh] rounded-lg flex flex-col justify-evenly items-center border rounded-lg"  onClick={()=>{
       setPhone(true);
       setEmail(false);
       setOauth(false);
       setPhoneBtn(false)
       setEmailBtn(false)
     }}>
      <Typography variant="body2">Phone number</Typography>
     </div> }
     </div>
        <div className="p-2 m-2">
    { emailbtn &&  <div className="text-center shadow-4xl rounded-[8px]  p-2 w-[50vw] h-[6vh] rounded-lg  flex flex-col justify-evenly border rounded-lg items-center" onClick={()=>{
       setEmail(true);
       setPhone(false);
       setOauth(false);
        setPhoneBtn(false)
       setEmailBtn(false)
     }}>
      <Typography variant="body2">Email Link</Typography>
     </div> }
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