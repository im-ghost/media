import {
  Typography
} from "@mui/material"
import { Outlet} from "react-router-dom"
const Home = () => {
  return(
    <div>
     <Typography variant="h1">Home page</Typography>
     <Outlet />
    </div>
    )
}


export default Home;