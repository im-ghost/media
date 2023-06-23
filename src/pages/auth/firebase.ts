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
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
   
    window.localStorage.setItem('emailForSignIn', email);
   return "sent"
  })
  .catch((error:any) => {
    
    
    return error
  });
  
}
export const verifyPhone = (number:any,code:string | number,confirmationResult:any) =>{
confirmationResult.confirm(code).then((result:any) => {
 
  const user:any = result.user;
  if(user){
    return number
  }
}).catch((error:any) => {
  return error
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
      return confirmationResult;
    }).catch((error: any) => {
      return error
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

    toast.error("An error Occured")
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
  
    toast.error("An error Occured")
  });
}