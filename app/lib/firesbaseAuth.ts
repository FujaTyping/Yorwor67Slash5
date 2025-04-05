/* eslint-disable @typescript-eslint/no-explicit-any */
import app from "./firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
auth.languageCode = 'th';

export const signInWithGoogle = async (): Promise<any> => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userData = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
        };

        return userData;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(errorMessage);
        throw error;
    }
}

export { auth, provider };
