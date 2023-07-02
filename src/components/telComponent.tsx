
import {
  TextField,
  IconButton,
  InputAdornment
} from "@mui/material"
import {
  useState,
  FC,
  ChangeEvent
  } from "react"
  /*
import {
  FaPhone,
   } from 'react-icons/fa';*/
export const Phone:FC<{
  value:string,
  onChange:any
}>= ({value,onChange}) => {
  return (
      
 <TextField 
     id="tel"
     label="Telephone"
     placeholder = "Telephone"
     InputProps = {{
       type:"tel",
       value: value,
         startAdornment: (
            <InputAdornment position="start">
              p
            </InputAdornment>
          ),
       onChange:(e:ChangeEvent<HTMLInputElement>)=>{
         onChange({
           type:"setTel",
           payload:e.target.value
         })
       }
     }}
     />
    )
}
