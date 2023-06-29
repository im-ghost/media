
import type { USER } from "../../app/types"


 export const initialState:USER = {
   name:"",
   email:"",
   phone:"",
   password:null,
   bio:"",
   image:null
 }
 type ACTION = {
  type: string;
  payload?: any;
};
 export const reducer = (state:USER,action:ACTION):USER =>{
   switch (action.type) {
     case 'setName':
       return{
         ...state,
         name:action.payload
       }
       //eslint-disable-next-line
     break;
   
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
   
     case 'setPassword2':
       return{
         ...state,
         password2:action.payload
       }
       //eslint-disable-next-line
     break;
   
     case 'setTel':
       return{
         ...state,
         phone:action.payload
       }
       //eslint-disable-next-line
     break;
   
     case 'setBio':
       return{
         ...state,
         bio:action.payload
       }
       //eslint-disable-next-line
     break;
     case 'setImage':
       return{
         ...state,
         image:action.payload
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
 