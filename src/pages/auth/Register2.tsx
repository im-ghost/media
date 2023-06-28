import {
  Typography,
  TextField,
  Box,
  Button
} from "@mui/material"
import {
  useState,
  useReducer,
  useEffect,
  FC,
  ChangeEvent
  } from "react"
import { 
  useAppSelector,
  useAppDispatch 
} from "../../app/store"
import {
  useRegisterUserMutation
  } from "../../features/user/userApiSlice";
import {
  setUser as SetUser
} from "../../features/user/userSlice";
import { 
  useNavigate
} from "react-router-dom"
import {
  toast 
} from "react-toastify";
import type { USER } from "../../app/types";
import {
  initialState,
  reducer
} from "./reducer"
const Register2:FC = ():JSX.Element => {
  const [user,setUser] = useState<USER | null>(null);
  const [emailAuth,setEmailAuth] = useState<Boolean>(false);
  const [emailAuthData,setEmailAuthData] = useState<string>("");
  const [phoneAuth,setPhoneAuth] = useState<Boolean>(false);
  const [phoneAuthData,setPhoneAuthData] = useState<string | number>();
  const userInfo:USER | null = useAppSelector(state=>state.user.userInfo)
  const userSign:any | null = useAppSelector(state=>state.user.userSign)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [register,{isLoading,error,data}] = useRegisterUserMutation();
  const create = async (e:any) =>{
    e.preventDefault();
    setState({type:"reset"})
    const data = {
   name:state.name,
   email:state.email,
   phone:state.phone,
   password:state.password,
   bio:state.bio,
   image:state.image
    }
    await register(data).unwrap();
  }
  useEffect(()=>{
    if(error){
      console.log(error)
     toast.error(JSON.stringify(error))
    }
  },[error])
  useEffect(()=>{
    if(data){
    console.log(data);
    (async ()=>{
    await dispatch(SetUser(data))
    })()
    navigate("/profile")
    }
  },[data,navigate,dispatch])
 useEffect(()=>{
   
  const setIt = async (user:USER | null) =>{
    if(user){
    await dispatch(SetUser(user))
    }
  }
   console.log(userInfo)
   console.log(user)
     if(user){
       setUser(user);
       navigate("/profile");
       setIt(user)
     }
 },[user,navigate,userInfo])
 useEffect(()=>{
   if(userSign !== null || userSign !== undefined){
   if(userSign && userSign.num !== undefined){
     setPhoneAuth(true)
     setPhoneAuthData(userSign.num)
     setState({
       type:"setTel",
       payload:userSign.num
      
     })
   }else if(userSign && userSign.email !== undefined){
     setEmailAuth(true)
     setEmailAuthData(userSign.email)
       setState({
       type:"setEmail",
       payload:userSign.email
     })
   }
   if(userSign && userSign.displayName!== undefined && userSign.photoUrl !== undefined){
      setState({
       type:"setName",
       payload:userSign.displayName
     })
      setState({
       type:"setImage",
       payload:userSign.photoUrl
     })
   }
   }
 },[userSign])
 const [state,setState] = useReducer(reducer,initialState)
   return(
    <div className="text-center shadow rounded-lg bg">
     <Typography variant="h2">Complete your registration</Typography>
     <Box 
     component="form"
     noValidate
     autoComplete="on"
     sx={{
       '& .MuiTextField-root': { m: 1, width: '80vw' },
     }}
     >
     <TextField 
     id="name"
     label="Name"
     placeholder = "Full name"
     InputProps = {{
       value:state.name,
       onChange:(e:ChangeEvent<HTMLInputElement>)=>{
         setState({
           type:"setName",
           payload:e.target.value
         })
       }
     }}
     />
  { 
  emailAuth &&
  ( <TextField 
     id="tel"
     label="Telephone"
     placeholder = "Telephone"
     InputProps = {{
       type:"tel",
       value:state.phone,
       onChange:(e:ChangeEvent<HTMLInputElement>)=>{
         setState({
           type:"setTel",
           payload:e.target.value
         })
       }
     }}
     />) }
   { phoneAuth &&  ( <TextField 
     id="email"
     label="Email Address"
     placeholder = "medi@medi.com"
     InputProps = {{
     type:"email",
       value:state.email,
       onChange:(e:ChangeEvent<HTMLInputElement>)=>{
         setState({
           type:"setEmail",
           payload:e.target.value
         })
       }
     }}
     />)
  }
     <TextField 
     id="password"
     label="Password"
     placeholder = "Your password"
     InputProps = {{
       type:"password",
       value:state.password,
       onChange:(e:ChangeEvent<HTMLInputElement>)=>{
         setState({
           type:"setPassword",
           payload:e.target.value
         })
       }
     }}
     />
     <TextField 
     id="password"
     label="Password"
     placeholder = "Comfirm Your password"
     InputProps = {{
       type:"password",
       value:state.password2,
       onChange:(e:ChangeEvent<HTMLInputElement>)=>{
         setState({
           type:"setPassword2",
           payload:e.target.value
         })
       }
     }}
     />
     <TextField 
     id="bio"
     label="Bio"
     placeholder = "Tell us something about yourself"
     InputProps = {{
       value:state.bio,
       onChange:(e:ChangeEvent<HTMLInputElement>)=>{
         setState({
           type:"setBio",
           payload:e.target.value
         })
       }
     }}
     />
     </Box>
     <Button variant="outlined" color="primary" onClick={create}><Typography variant="h6"> Create </Typography></Button>
     <div className="p-2 rounded shadow" onClick={()=>navigate("/login")}>
     <Typography variant="h6"> Already have an account? Login</Typography>
     </div>
    </div>
    )
}


export default Register2;