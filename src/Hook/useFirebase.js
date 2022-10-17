import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useState } from "react";
import app from "./firebaseConfig"




const useFirebase = () => {
    const [userInfo, setUserInfo] = useState('');


    const auth = getAuth(app);
    const GoogleProvider = new GoogleAuthProvider();

    const handleGoogleLogin = () => {
        signInWithPopup(auth, GoogleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user)
                setUserInfo(user)

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(error);
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const test = () => {
        console.log('test')
    }

    return { handleGoogleLogin, test, userInfo };



}

export default useFirebase;