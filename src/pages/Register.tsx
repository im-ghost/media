import {
  Typography,
  TextField,
  Box,
  Button
} from "@mui/material"
import { useState,useReducer,useEffect,FC,Reducer } from "react"
import { useAppSelector,useAppDispatch } from "../app/store"
import { useRegisterUserMutation } from "../features/user/userApiSlice";
import { setUser as SetUser,selectUser } from "../features/user/userSlice";
import { useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import type { USER } from "../app/types"
const Register:FC = ():JSX.Element => {
  const [user,setUser] = useState<USER | null>(null);
  const userInfo:USER | null = useAppSelector(state=>state.user.userInfo)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [register,{isLoading,error,data}] = useRegisterUserMutation();
  const create = async (e:any) =>{
    e.preventDefault();
    setState({
      type:"reset"
      
    })
    const data = {
   name:state.name,
   email:state.email,
   phone:state.phone,
   password:state.password,
   bio:state.bio
    }
    await register(data).unwrap();
  }
  useEffect(()=>{
    if(error){
      //toast.error(error.status)
    }
  },[error])
  useEffect(()=>{
    alert("Loading")
  },[isLoading])
  useEffect(()=>{
    if(data){
    console.log(data);
    (async ()=>{
    await dispatch(SetUser(data))
    })()
    }
  },[data])
 useEffect(()=>{
   setUser(userInfo);
   setTimeout(()=>{
     if(user){
       navigate("/profile")
     }else{
      
     }
   },2000)
 },[user])
 const initialState:USER = {
   name:"",
   email:"",
   phone:"",
   password:"",
   bio:"",
   password2:"",
 }
 type ACTION = {
  type: string;
  payload?: any; // Define the payload type for your actions, if needed
};
 const reducer = (state:USER,action:ACTION):USER =>{
   switch (action.type) {
     case 'setName':
       return{
         ...state,
         name:action.payload
       }
       //eslint-disable-next-line
     break;
   
     case 'setEmail':
       return{
         ...state,
         email:action.payload
       }
       //eslint-disable-next-line
     break;
   
     case 'setPassword':
       return{
         ...state,
         password:action.payload
       }
       //eslint-disable-next-line
     break;
   
     case 'setPassword2':
       return{
         ...state,
         password2:action.payload
       }
       //eslint-disable-next-line
     break;
   
     case 'setTel':
       return{
         ...state,
         phone:action.payload
       }
       //eslint-disable-next-line
     break;
   
     case 'setBio':
       return{
         ...state,
         bio:action.payload
       }
       //eslint-disable-next-line
     break;
   
     case 'reset':
       return{
         ...initialState
       }
       //eslint-disable-next-line
     break;
   
     default:
     return state
   }
 }
 const [state,setState] = useReducer(reducer,initialState)
   return(
    <div>
     <Typography variant="h1">Register page</Typography>
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
       onChange:(e)=>{
         setState({
           type:"setName",
           payload:e.target.value
         })
       }
     }}
     />
     <TextField 
     id="tel"
     label="Telephone"
     placeholder = "Telephone"
     InputProps = {{
       type:"tel",
       value:state.phone,
       onChange:(e)=>{
         setState({
           type:"setTel",
           payload:e.target.value
         })
       }
     }}
     />
     <TextField 
     id="email"
     label="Email Address"
     placeholder = "medi@medi.com"
     InputProps = {{
     type:"email",
       value:state.email,
       onChange:(e)=>{
         setState({
           type:"setEmail",
           payload:e.target.value
         })
       }
     }}
     />
     <TextField 
     id="password"
     label="Password"
     placeholder = "Your password"
     InputProps = {{
       type:"password",
       value:state.password,
       onChange:(e)=>{
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
       onChange:(e)=>{
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
       onChange:(e)=>{
         setState({
           type:"setBio",
           payload:e.target.value
         })
       }
     }}
     />
     </Box>
     <Button onClick={create}> Create </Button>
    </div>
    )
}


export default Register;