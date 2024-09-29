import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";

// Load environment variables from .env file if needed
// (process.env is not typed directly, so you may need `dotenv` configuration in tsconfig or similar setup)
const firebaseConfig = {
    apiKey: process.env.ApiKey as string,
    authDomain: process.env.AuthDomain as string,
    projectId: process.env.ProjectId as string,
    storageBucket: process.env.StorageBucket as string,
    messagingSenderId: process.env.MessagingSenderId as string,
    appId: process.env.AppId as string,
    measurementId: process.env.MeasurementId as string,
};

console.log(firebaseConfig)

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle Google sign-in
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
        throw error;  // rethrow to handle elsewhere if needed
    }
}

// Export Firebase auth and provider for reuse
export { auth, provider };
