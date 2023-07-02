import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
const auth = getAuth();
var _window = {
    confirmationResult: undefined,
    verified: false,
    email: "",
    photoUrl: "",
    displayName: "",
    uid: ""
};
export const emailLink = (email) => {
    const actionCodeSettings = {
        url: 'http://localhost:3000/register2',
        handleCodeInApp: true
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        return "sent";
    })
        .catch((error) => {
        console.log(error);
        toast.error(JSON.stringify(error));
        throw new Error(error);
    });
};
export const verifyPhone = async (number, code, confirmationResult) => {
    await _window.confirmationResult.confirm(code).then((result) => {
        _window.verified = true;
    }).catch((error) => {
        console.log(error);
        toast.error(JSON.stringify(error));
        throw new Error(error);
    });
    if (_window.verified) {
        return number;
    }
};
export const phone = (phoneNumber) => {
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
            return solved();
        },
        'expired-callback': () => {
            //  recaptchaVerifier.render()
        }
    }, auth);
    recaptchaVerifier.render();
    const solved = () => {
        const appVerifier = recaptchaVerifier;
        const num = phoneNumber.toString();
        signInWithPhoneNumber(auth, num, appVerifier)
            .then((confirmationResult) => {
            _window.confirmationResult = confirmationResult;
            return confirmationResult;
        }).catch((error) => {
            console.log(error);
            toast.error(JSON.stringify(error));
            throw new Error(error);
        });
    };
};
export const google = async (navigate, isLogin) => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
        .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
            const token = credential.accessToken;
            const user = result.user;
            if (user) {
                user.token = token;
                _window.email = user.email;
                _window.photoUrl = user.photoURL;
                _window.displayName = user.displayName;
                _window.uid = user.uid;
                if (isLogin) {
                }
                else {
                    navigate("/register2");
                }
            }
            else {
                toast.error("An error Occured");
            }
        }
        else {
            toast.error("An error occured ");
        }
    }).catch((error) => {
        // Handle Errors here.
        // The email of the user's account used.
        console.log(error);
        toast.error(JSON.stringify(error));
        throw new Error(error);
    });
    return {
        email: _window.email,
        photoUrl: _window.photoUrl,
        displayName: _window.displayName,
        uid: _window.uid
    };
};
export const twitter = async (navigate, isLogin) => {
    const provider = new TwitterAuthProvider();
    await signInWithPopup(auth, provider)
        .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
            const token = credential.accessToken;
            const user = result.user;
            if (user) {
                user.token = token;
                _window.email = user.email;
                _window.photoUrl = user.photoURL;
                _window.displayName = user.displayName;
                _window.uid = user.uid;
                if (isLogin) {
                }
                else {
                    navigate("/register2");
                }
            }
            else {
                toast.error("An error Occured");
            }
        }
        else {
            toast.error("An error Occured");
        }
    }).catch((error) => {
        console.log(error);
        toast.error(JSON.stringify(error));
        throw new Error(error);
    });
    return {
        email: _window.email,
        photoUrl: _window.photoUrl,
        displayName: _window.displayName,
        uid: _window.uid
    };
};
