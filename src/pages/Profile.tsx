import {
  Typography
} from "@mui/material"
import {
  useEffect,
  useState
} from "react"
import { useAppSelector,useAppDispatch } from "../app/store";
import {
  useNavigate
} from "react-router-dom"
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user,setUser] = useState(null)
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