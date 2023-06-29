
 type ACTION = {
  type: string;
  payload?: any;
};
type USERL = {
  email: string,
  password : string
}

 export const initialState:USERL = {
   email:"",
   password:"",
 }
export const reducer = (state:USERL,action:ACTION):USERL =>{
   switch (action.type) {
    
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