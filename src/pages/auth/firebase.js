import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendSignInLinkToEmail,
} from 'firebase/auth';
import { toast } from 'react-toastify';

const auth = getAuth();
const dWindow = {
  confirmationResult: undefined,
  verified: false,
  email: '',
  photoUrl: '',
  displayName: '',
  uid: '',
};
export const emailLink = (email) => {
  const actionCodeSettings = {
    url: 'http://localhost:3000/register2',
    handleCodeInApp: true,
  };
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
      return 'sent';
    })
    .catch((error) => {
      console.log(error);
      toast.error(JSON.stringify(error));
      throw new Error(error);
    });
};
export const verifyPhone = async (number, code, confirmationResult) => {
  console.log(Object.keys(confirmationResult));
  await dWindow.confirmationResult
    .confirm(code)
    .then((result) => {
      console.log(Object.keys(result));
      dWindow.verified = true;
    })
    .catch((error) => {
      console.log(error);
      toast.error(JSON.stringify(error));
      throw new Error(error);
    });
  if (dWindow.verified) {
    return number;
  }
  return 'Wrong code';
};
export const phone = (phoneNumber) => {
  const solved = (response) => {
    console.log(Object.keys(response));
    const appVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'normal',
        callback: () => {},
        'expired-callback': () => {},
      },
      auth,
    );

    const num = phoneNumber.toString();
    signInWithPhoneNumber(auth, num, appVerifier)
      .then((confirmationResult) => {
        dWindow.confirmationResult = confirmationResult;
        return confirmationResult;
      })
      .catch((error) => {
        console.log(error);
        toast.error(JSON.stringify(error));
        throw new Error(error);
      });
  };
  const recaptchaPromise = new Promise((resolve, reject) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'normal',
        callback: (response) => {
          console.log(typeof response);
          resolve(response);
        },
        'expired-callback': () => {
          // recaptchaVerifier.render();
          reject(new Error('Recaptcha expired'));
        },
      },
      auth,
    );

    recaptchaVerifier.render();
  });

  recaptchaPromise
    .then((response) => {
      solved(response);
    })
    .catch((error) => {
      console.log(error);
      toast.error(JSON.stringify(error));
      throw new Error(error);
    });
};

export const google = async (navigate, isLogin) => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        const { user } = result;
        if (user) {
          user.token = token;
          dWindow.email = user.email;
          dWindow.photoUrl = user.photoURL;
          dWindow.displayName = user.displayName;
          dWindow.uid = user.uid;
          if (isLogin) {
            console.log(isLogin);
          } else {
            navigate('/register2');
          }
        } else {
          toast.error('An error Occured');
        }
      } else {
        toast.error('An error occured ');
      }
    })
    .catch((error) => {
      // Handle Errors here.
      // The email of the user's account used.
      console.log(error);
      toast.error(JSON.stringify(error));
      throw new Error(error);
    });
  return {
    email: dWindow.email,
    photoUrl: dWindow.photoUrl,
    displayName: dWindow.displayName,
    uid: dWindow.uid,
  };
};
export const twitter = async (navigate, isLogin) => {
  const provider = new TwitterAuthProvider();
  await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        const { user } = result;
        if (user) {
          user.token = token;
          dWindow.email = user.email;
          dWindow.photoUrl = user.photoURL;
          dWindow.displayName = user.displayName;
          dWindow.uid = user.uid;
          if (isLogin) {
            console.log(isLogin);
          } else {
            navigate('/register2');
          }
        } else {
          toast.error('An error Occured');
        }
      } else {
        toast.error('An error Occured');
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error(JSON.stringify(error));
      throw new Error(error);
    });
  return {
    email: dWindow.email,
    photoUrl: dWindow.photoUrl,
    displayName: dWindow.displayName,
    uid: dWindow.uid,
  };
};
