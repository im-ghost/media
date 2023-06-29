import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendSignInLinkToEmail
} from "firebase/auth";
import {
  toast
} from "react-toastify"
const auth = getAuth();
var _window:{
  confirmationResult:any,
  verified:Boolean,
  email:string,
  photoUrl:string,
  displayName:string
} = {
  confirmationResult: undefined,
  verified:false,
  email:"",
  photoUrl:"",
  displayName:"",
}
export const emailLink = (email:string) =>{
  const actionCodeSettings = {
  url: 'http://localhost:3000/register2',
  handleCodeInApp: true
};

  sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    window.localStorage.setItem('emailForSignIn', email);
   
   return "sent"
  })
  .catch((error:any) => {
    
    console.log(error)
    toast.error(JSON.stringify(error))
    throw new Error(error)
  });
  
}
export const verifyPhone = async (number:any,code:string | number,confirmationResult:any) =>{
await _window.confirmationResult.confirm(code).then((result:any) => {
    _window.verified = true;
}).catch((error:any) => {
  
    console.log(error)
    toast.error(JSON.stringify(error))
    throw new Error(error)
});
if(_window.verified){
  return number
}
}
export const phone = (phoneNumber:number) => {
  
const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'normal',
  'callback': (response:any) => {
      return solved()
  },
  'expired-callback': () => {
  //  recaptchaVerifier.render()
  }
}, auth);
   recaptchaVerifier.render()
const solved = () =>{
  
const appVerifier = recaptchaVerifier;
const num = phoneNumber.toString()
signInWithPhoneNumber(auth, num, appVerifier)
    .then((confirmationResult:any) => {
     _window.confirmationResult= confirmationResult;
     
      return confirmationResult;
    }).catch((error: any) => {
        
    console.log(error)
    toast.error(JSON.stringify(error))
    throw new Error(error)
    });
}

}
export const google = async (navigate:any,isLogin:Boolean) => {
const provider = new GoogleAuthProvider();
await signInWithPopup(auth, provider)
  .then((result) => {
    const credential:any = GoogleAuthProvider.credentialFromResult(result);
    if(credential){
    const token = credential.accessToken;
    const user:any = result.user;
   
    
    if(user){ 
      user.token = token;
     console.log(user)
      _window.email = user.email
      _window.photoUrl = user.photoURL
      _window.displayName = user.displayName
      console.log(_window)
      if(isLogin){
       
       
      }else{
     navigate("/register2")
      }
    }else{
    toast.error("An error Occured")
    }
    }else{
      toast.error("An error occured ")
    }
  }).catch((error:any) => {
    // Handle Errors here.
    
    
    // The email of the user's account used.

      
    console.log(error)
    toast.error(JSON.stringify(error))
    throw new Error(error)
  });
  return {
    email:_window.email,
    photoUrl:_window.photoUrl,
    displayName:_window.displayName
  }
}
export const twitter = async (navigate:any,isLogin:Boolean) => {
const provider = new TwitterAuthProvider();
await signInWithPopup(auth, provider)
  .then((result:any) => {
    const credential: any = GoogleAuthProvider.credentialFromResult(result);
    if(credential){
    const token:string = credential.accessToken;
    const user:any = result.user;
    if(user) {
      user.token = token;
         console.log(user)
      _window.email = user.email
      _window.photoUrl = user.photoURL
      _window.displayName = user.displayName
      console.log(_window)
     
      if(isLogin){
       
      }else{
     navigate("/register2")
      }
    }else{
    toast.error("An error Occured")}
    }else{
       toast.error("An error Occured")
    }
  }).catch((error: any) => {
  
      
    console.log(error)
    toast.error(JSON.stringify(error))
    throw new Error(error)
  });
    return {
    email:_window.email,
    photoUrl:_window.photoUrl,
    displayName:_window.displayName
  }
}