import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import firebaseConfig from "./firebase-config"

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithGoogle = async (): Promise<UserCredential> => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result;
    } catch (error: unknown) {
        const errorMessage = error;
        console.error(errorMessage);
        throw error;
    }
}

export { auth, provider };
