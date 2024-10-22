import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebaseConfig from "./firebase-config";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
