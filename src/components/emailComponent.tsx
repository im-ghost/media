import {
  TextField,
  InputAdornment
} from "@mui/material"
import {
  FC,
  ChangeEvent
  } from "react"
  
import {
  FaEnvelope,
  } from 'react-icons/fa';
export const Email:FC<{
  value:string | null,
  onChange:any
}> = ({value,onChange}) => {
  return (
         <TextField 
     id="email"
     label="Email Address"
     placeholder = "medi@medi.com"
     className="dark:text-amber-900 text-amber-400 bg-sky-900 dark:bg-slate-600 rounded-xl"
     InputProps = {{
     type:"email",
       value:value,
         startAdornment: (
            <InputAdornment position="start">
              <FaEnvelope />
            </InputAdornment>
          ),
       onChange:(e:ChangeEvent<HTMLInputElement>)=>{
         onChange({
           type:"setEmail",
           payload:e.target.value
         })
       }
     }}
     />
    )
}