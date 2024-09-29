import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import firebaseConfig from "./firebase-config"

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithGoogle = async (): Promise<UserCredential> => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        console.log('User:', user);
        console.log('Token:', token);

        return result;
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error('Error during sign-in:', errorMessage);
        throw error;
    }
}

export { auth, provider };
