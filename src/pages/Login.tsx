import {
  Typography,
  TextField,
  Box,
  Button,
  Card
} from "@mui/material"
import {
  useState,
  useReducer,
  useEffect,
  FC,
  Reducer,
  ChangeEvent
  } from "react"
import { 
  useAppSelector,
  useAppDispatch 
} from "../app/store"
import {
  useLoginUserMutation
  } from "../features/user/userApiSlice";
import {
  setUser as SetUser,
  selectUser 
} from "../features/user/userSlice";
import { 
  useNavigate
} from "react-router-dom"
import {
  toast 
} from "react-toastify";
import type { USER } from "../app/types"


const Login:FC = ():JSX.Element => {
  const [user,setUser] = useState<USER | null>(null);
  const userInfo:USER | null = useAppSelector(state=>state.user.userInfo)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login,{isLoading,error,data}] = useLoginUserMutation();
  
 type ACTION = {
  type: string;
  payload?: any;
};
type USERL = {
  email: string,
  password : string
}
  const create = async (e:any) =>{
    e.preventDefault();
    setState({
      type:"reset"
       
    })
    const data = {
   email:state.email,
   password:state.password,
 
    }
    await login(data).unwrap();
  }
  useEffect(()=>{
    if(error){
      console.log(error)
     toast.error(JSON.stringify(error))
    }
  },[error])
  useEffect(()=>{
  console.log("loading")
  },[isLoading])
  useEffect(()=>{
    if(data){
    console.log(data);
    (async ()=>{
      console.log("Before dispatch ")
    await dispatch(SetUser(data))
    console.log("After dispatch ")
    })()
    navigate("/profile")
    }
  },[data])
  
  const setIt = async (user:USER | null) =>{
    if(user){
      console.log(user)
    await dispatch(SetUser(user))
    console.log("dispatched ")
    }
  }
 useEffect(()=>{
   console.log(userInfo)
   console.log(user)
     if(user){
        setUser(user);
       navigate("/profile");
       setIt(user)
     }
 },[user])
 const initialState:USERL = {
   email:"",
   password:"",
 }
 const reducer = (state:USERL,action:ACTION):USERL =>{
   switch (action.type) {
    
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
     <div className="flex text-center items-center justify-center w-screen h-screen">
    <Card raised={true} className="text-center shadow rounded-2xl w-4/5 h-1/2 p-2">
     <Typography variant="h2">Login page</Typography>
     <Box 
     component="form"
     autoComplete="on"
     sx={{
       '& .MuiTextField-root': { m: 1, width: '65vw' },
     }}
     >
     <TextField 
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
     />
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
     </Box>
     <Button variant="outlined" color="primary" onClick={create}><Typography variant="h6"> Login </Typography></Button>
     <div className="p-2 rounded shadow" onClick={()=>navigate("/register")}>
     <Typography variant="h6"> Don't have an account ? Sign up</Typography>
     </div>
    </Card>
    </div>
    )
}


export default Login;