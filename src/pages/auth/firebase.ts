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
export const emailLink = (email:string) =>{
  const actionCodeSettings = {
  url: 'http://localhost:3000/register2',
  handleCodeInApp: true
};

  sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    window.localStorage.setItem('emailForSignIn', email);
    console.log(actionCodeSettings)
   return "sent"
  })
  .catch((error:any) => {
    
    console.log(error)
    toast.error(JSON.stringify(error))
    throw new Error(error)
  });
  
}
export const verifyPhone = (number:any,code:string | number,confirmationResult:any) =>{
confirmationResult.confirm(code).then((result:any) => {
 console.log(result)
  const user:any = result.user;
  if(user){
    return number
  }
}).catch((error:any) => {
  
    console.log(error)
    toast.error(JSON.stringify(error))
    throw new Error(error)
});

}
export const phone = (phoneNumber:number) => {
  
const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'normal',
  'callback': (response:any) => {
   solved()
  },
  'expired-callback': () => {
    recaptchaVerifier.render()
  }
}, auth);
   recaptchaVerifier.render()
const solved = () =>{
  
const appVerifier = recaptchaVerifier;
const num = phoneNumber.toString()
signInWithPhoneNumber(auth, num, appVerifier)
    .then((confirmationResult:any) => {
      console.log(confirmationResult)
      return confirmationResult;
    }).catch((error: any) => {
        
    console.log(error)
    toast.error(JSON.stringify(error))
    throw new Error(error)
    });
}

}
export const google = () => {
const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    const credential:any = GoogleAuthProvider.credentialFromResult(result);
    if(credential){
    const token = credential.accessToken;
    const user:any = result.user;
   
    
    if(user){ 
      user.token = token;
      return user
      
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
}
export const twitter = () => {
const provider = new TwitterAuthProvider();
signInWithPopup(auth, provider)
  .then((result:any) => {
    const credential: any = GoogleAuthProvider.credentialFromResult(result);
    if(credential){
    const token:string = credential.accessToken;
    const user:any = result.user;
    if(user) {
      user.token = token;
      return user
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
}