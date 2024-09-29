"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();
  const [title] = useState("Hatyaiwit - ผู้ดูแลระบบ");
  const [email, setEmail] = useState('ด้วย Gmail');
  const [username, setUsername] = useState('กรุณาล็อกอิน');
  const [photourl, setPhotourl] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBID1Qv2l9GtFuT6X24KagJ10o4IbL1zuebg&s');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const request = indexedDB.open('firebaseLocalStorageDb', 1);

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(['firebaseLocalStorage'], 'readonly');
        const objectStore = transaction.objectStore('firebaseLocalStorage');

        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = () => {
          const data = getAllRequest.result;
          const user = data[0]?.value;

          if (!user) {
            return router.push('/');
          }

          setEmail(user.email);
          setUsername(user.displayName);
          setPhotourl(user.photoURL);
        };

        getAllRequest.onerror = () => {
          console.error('Error accessing firebaseLocalStorage');
        };
      };

      request.onerror = (event) => {
        console.error((event.target as IDBOpenDBRequest).error);
      };
    }
  }, []);
  return (
    <>
      <title>{title}</title>
      <div className="container">
        <h1 style={{textAlign:'center'}}>ยินดีต้อนรับ</h1>
        <div style={{ margin: 'auto',maxWidth:'33rem' }} className="p-2">
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img alt="Profile" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={photourl}></img>
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">{username}</h2>
              <p className="text-gray-500">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
