import {
  Typography,
  Box,
  Button,
  IconButton
} from "@mui/material"
import {
  useState,
  useReducer,
  useEffect,
  FC
  } from "react"
import { 
  useAppSelector,
  useAppDispatch 
} from "../../app/store"
import {
  FaUserCircle
} from "react-icons/fa"
import {
  useLoginUserMutation
  } from "../../features/user/userApiSlice";
  import { Password } from "../../components/passwordInput"
  import { Email } from "../../components/emailComponent"
import {
  setUser as SetUser
} from "../../features/user/userSlice";
import { 
  useNavigate
} from "react-router-dom"
import {
  toast 
} from "react-toastify";
import type { USER } from "../../app/types"
import AuthProviders from "../../components/oauthInput"

import { reducer,initialState } from "./loginReducer"
const Login:FC = ():JSX.Element => {

 
  const [user,setUser] = useState<USER | null>(null);
  const userInfo:USER | null = useAppSelector(state=>state.user.userInfo)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login,{error,data}] = useLoginUserMutation();
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
    if(data){
    (async ()=>{
    await dispatch(SetUser(data))
    })()
    navigate("/profile")
    }
  },[data,dispatch,navigate])
  
 useEffect(()=>{
  const setIt = async (user:USER | null) =>{
    if(user){
    await dispatch(SetUser(user))
    }
  }
     if(user){
        setUser(user);
       navigate("/profile");
       setIt(user)
     }
 },[user, navigate,userInfo,dispatch])
 const [state,setState] = useReducer(reducer,initialState)
   return(
     <div className="flex flex-row text-center items-center justify-center w-screen h-screen min-h-screen  justify-center dark:text-amber-200 text-amber-800 bg-sky-300 dark:bg-slate-900 items-center p-0">
    <div className="text-center shadow-4xl rounded-[18px]  p-2 w-[80vw] h-[60vh] rounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-40% to-emerald-500 to-100%  dark:from-blue-700 dark:from-20% dark:via-emarald-700 dark:via-30% dark:to-ryan-700 dark:to-100% dark:text-amber-500 text-amber-800  flex flex-col justify-evenly items-center  backdrop-blur-3xl [backdrop-filter: blur(30px)]">
    <IconButton>
        <FaUserCircle className="text-4xl text-bold dark:text-amber-500 text-amber-800 bg-sky-400 dark:bg-slate-800" />
      </IconButton>
     <Typography variant="h4" className="md-2 my-2">Welcome Back</Typography>
     
   <Box
    component="form"
     autoComplete="on"
     className="mu-2"
     sx={{
       '& .MuiTextField-root': { m: 1, width: '69vw' },
     }}
   >
 <Email value={state.email} onChange={setState} />
 <Password value={state.password} onChange={setState} />
 </Box>
     <Button variant="contained"  className="text-center shadow-4xl rounded-[8px]  p-2 w-[40vw] h-[6vh] rounded-lg dark:text-amber-500 text-amber-800 bg-sky-400 dark:bg-slate-800 flex flex-col justify-evenly items-center"  onClick={create}><Typography variant="body1">  
  Login </Typography></Button>
  <AuthProviders isLogin={true}/>
     <div className="rounded " onClick={()=>navigate("/register")}>
     <Typography variant="body2"> Don't have an account ? Sign up</Typography>
     </div>
    </div>
    </div>
    )
}


export default Login;


