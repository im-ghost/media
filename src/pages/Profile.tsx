import {
  Typography
} from "@mui/material"
import {
  useEffect,
  useState,
  FC
} from "react"
import { useAppSelector,useAppDispatch } from "../app/store";
import {
  useNavigate,
  useParams
} from "react-router-dom";
import type {
  USER
} from "../app/types"

const Profile:FC = ():JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user,setUser] = useState<USER | null>(null)
  const userFromStore = useAppSelector(state=>state.user.userInfo)
  useEffect(()=>{
    if(userFromStore){
    setUser(userFromStore);
    }else{
      navigate("/login")
    }
  },[userFromStore])
   return(
    <div>
     <Typography variant="h1">Profile page for {user && user.name}</Typography>
    </div>
    )
}


export default Profile;