import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import firebaseConfig from "./firebase-config";

const app = initializeApp(firebaseConfig);

let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    } else {
      console.warn("Firebase Analytics is not supported in this environment.");
    }
  });
}

export { analytics };
