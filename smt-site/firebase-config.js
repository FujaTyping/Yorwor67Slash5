import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCznhCcZXH2Mtdtk0Db3JA3K_J8ReVQTys",
  authDomain: "yorwor67slash5.firebaseapp.com",
  projectId: "yorwor67slash5",
  storageBucket: "yorwor67slash5.appspot.com",
  messagingSenderId: "109706921413",
  appId: "1:109706921413:web:59e9968561572d1395b7ac",
  measurementId: "G-RTRRZ1SMK9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;