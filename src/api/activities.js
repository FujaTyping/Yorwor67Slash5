const express = require('express');
const { doc, updateDoc, setDoc, serverTimestamp } = require('firebase/firestore');
const { Authenticate } = require('../utils/authenticate');
const { generateID } = require('../lib/module')

module.exports = (db) => {
    const router = express.Router();

    router.post("/", Authenticate, async (req, res) => {
      const title = req.body.title;
      const decs = req.body.decs;
      const url = req.body.url;
      const date = req.body.date;
      const uupdate = req.body.updatee;
      if (!title || !decs || !url || !date) {
        res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        const UID = generateID();
        const statActRef = doc(db, "Status", "Activities");
        await setDoc(doc(db, "Activities", `${UID}`), {
          title: `${title}`,
          decs: `${decs}`,
          url: `${url}`,
          date: `${date}`,
          timestamp: serverTimestamp(),
        });
        await updateDoc(statActRef, {
          UpdateTime: `${uupdate}`
        });
        res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
      }
    });

    return {
        baseRoute: '/activites',
        router,
    };
};
