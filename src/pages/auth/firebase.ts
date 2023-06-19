import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthPrivider
} from "firebase/auth";

const auth = getAuth();
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
export const emailLink = () => {}
export const phone = () => {} 