import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthPrivider,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

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
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return error
  });
  
}
export const verifyPhone = (number:number,code:string | number,confirmationResult:any) =>{
confirmationResult.confirm(code).then((result) => {
 
  const user = result.user;
  if(user){
    return number
  }
}).catch((error) => {
  return error
});

}
export const phone = (phoneNumber:number) => {
  
   recaptchaVerifier.render()
const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'normal',
  'callback': (response) => {
   solved()
  },
  'expired-callback': () => {
    recaptchaVerifier.render()
  }
}, auth);
const solved = () =>{
  
const appVerifier = recaptchaVerifier;
signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      return confirmationResult;
    }).catch((error) => {
      return error
    });
}

}
export const google = () => {
const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    user.token = token;
    if(user) return user
    throw new Error("An error Occured")
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    throw new Error("An error Occured")
  });
}
export const twitter = () => {
const provider = new TwitterAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    user.token = token;
    if(user) return user
    throw new Error("An error Occured")
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    throw new Error("An error Occured")
  });
}