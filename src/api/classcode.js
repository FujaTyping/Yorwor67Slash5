const express = require('express');
const { doc, updateDoc, getDocs, getDoc, setDoc, collection, query, orderBy, serverTimestamp } = require('firebase/firestore');
const { Authenticate } = require('../utils/authenticate');
const { generateID } = require('../lib/module')

const TreefetchInterval = 3 * 60 * 1000;
let TreelastFetchTime = 0;

let CRealData = {
    Classcode: [],
  };

module.exports = (db) => {
    const router = express.Router();

    router.get("/", async (req, res) => {
      if (Date.now() - TreelastFetchTime > TreefetchInterval) {
        const querySnapshot = await getDocs(collection(db, "Classcode"));
        CRealData.Classcode = [];
        querySnapshot.forEach((doc) => {
          CRealData.Classcode.push(doc.data());
        });
        TreelastFetchTime = Date.now();
      }
      res.send(CRealData);
    });
    
    router.post("/", Authenticate, async (req, res) => {
      const Code = req.body.code;
      const Teacher = req.body.teac;
      const Subject = req.body.subj;
      if (!Code || !Teacher || !Subject) {
        res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        const UID = generateID();
        await setDoc(doc(db, "Classcode", `${UID}`), {
          Code: `${Code}`,
          Teacher: `${Teacher}`,
          Subject: `${Subject}`,
        });
        res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
      }
    });

    return {
        baseRoute: '/classcode',
        router,
    };
};
