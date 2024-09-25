import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase-config.js";

export default async function Home() {
  let RealData = {
    Homework: [],
  };
  const querySnapshot = await getDocs(collection(db, "Homework"));
  querySnapshot.forEach((doc) => {
    RealData.Homework.push(doc.data());
  });
  return (
    <div className="container">
      <h1>Hatyaiwit M.4/5</h1>
      <h2>Powered by NEXT.JS with Flowbite</h2>
      <br />
      <div>
        DATA : {JSON.stringify(RealData.Homework[0])}
      </div>
    </div>
  );
}
