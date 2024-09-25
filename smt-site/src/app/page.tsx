import { useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase-config.js";

export default async function Home() {
  const [data,setData] = useState(null)
  const docRef = doc(db, "homework", "1");
  const docSnap = await getDoc(docRef);
  setData(docSnap.data())
  return (
    <div className="container">
      <h1>Hatyaiwit M.4/5</h1>
      <h2>Powered by NEXT.JS with Flowbite</h2>
      <br />
      <div>
        DATA : {data}
      </div>
    </div>
  );
}
