import {
  TextField,
  InputAdornment
} from "@mui/material"
import {
  useState,
  FC,
  ChangeEvent
  } from "react"
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
export const Password:FC<{
  value:string | null,
  onChange:any
}> = ({value,onChange}) => {
   const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  return (
        <TextField 
     id="password"
     label="Password"
      className="dark:text-amber-900 text-amber-400 bg-sky-900 dark:bg-slate-600 rounded-lg"
     placeholder = "Your password" 
     type={passwordVisible ? 'text' : 'password'}
     InputProps = {{
         type:passwordVisible ? 'text' : 'password',
       value:value,
        endAdornment: (
            <InputAdornment position="end">
              {passwordVisible ? (
                <RiEyeOffFill onClick={togglePasswordVisibility} />
              ) : (
                <RiEyeFill onClick={togglePasswordVisibility} />
              )}
            </InputAdornment>
          ),
       onChange:(e:ChangeEvent<HTMLInputElement>)=>{
         onChange({
           type:"setPassword",
           payload:e.target.value
         })
       }
     }}
     />
    )
}