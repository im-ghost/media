import {
  useGetNotificationsQuery
} from "../features/users/userApiSlice";
import Notification as Notif from "../components/notification";
import { toast } from "react-toastify"
import Loader from "../components/loader";
import React,{
  usState
} from "react";
import {
  Typography,
  Box
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice"
const Notification = () =>{
  const { token ,_id } = useSelector(selectUser)
  const [notifications,setNotifications] = useState();
  const { data,error,isLoading } = useGetNotificationsQuery({
    token:token,
    userId:_id,
  });
  useEffect(()=>{
    if(data){
      setNotifications(data.notifications)
    }
    if(error){
      toast.error(JSON.stringify(error))
    }
  },[data,error])
  if(isLoading){
    return <Loader />
  }
  if(notifications){
  return(
    <Box className="">
    <Typography variant="h4"></Typography>
    {
      notifications.map((not)=> <Notif notification={not} token={token} userId={_id}/>)
    }
    </Box>
    )
  }
  return <Typography variant="h4">No Notifications </Typography>
}

export default Notification;