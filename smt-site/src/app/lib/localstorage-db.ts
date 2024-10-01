import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useLocalStorge = (IsAdminpage: boolean) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [photourl, setPhotourl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBID1Qv2l9GtFuT6X24KagJ10o4IbL1zuebg&s",
  );
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const request = indexedDB.open("firebaseLocalStorageDb", 1);

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(["firebaseLocalStorage"], "readonly");
      const objectStore = transaction.objectStore("firebaseLocalStorage");

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = () => {
        const data = getAllRequest.result;
        const user = data[0]?.value;

        if (!user) {
          return router.push("/");
        }

        setPhotourl(user.photoURL);
        if (IsAdminpage) {
          setEmail(user.email);
          setUsername(user.displayName);
          if (!user.email.includes("@hatyaiwit.ac.th")) {
            setShowAlert(true);
          } else {
            setShowAlert(false);
          }
        }
      };

      getAllRequest.onerror = () => {
        console.error("Error accessing firebaseLocalStorage");
      };
    };

    request.onerror = (event) => {
      console.error((event.target as IDBOpenDBRequest).error);
    };
  }, []);

  return { email, username, photourl, showAlert };
};

export default useLocalStorge;
