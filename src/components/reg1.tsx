import {
  Typography,
} from "@mui/material"
import * as React from "react"
import RegButtons from "./regbuttons"
import { useNavigate } from "react-router-dom"
const Reg1:React.FC = ():JSX.Element => {
  const navigate = useNavigate();
   return(
    <div className="">
      <RegButtons />
     <div className="p-2 rounded shadow" onClick={()=>navigate("/login")}>
     <Typography variant="h6"> Already have an account? Login</Typography>
     </div>
    </div>
    )
}


export default Reg1;