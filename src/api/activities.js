const express = require('express');
const { Authenticate } = require('../utils/authenticate');
const { generateID } = require('../lib/module');
const { getDocs, collection, query, orderBy, setDoc, doc, updateDoc, getDoc, serverTimestamp } = require('firebase/firestore');
let ActData = { Activities: [], Static: {} };
const TreefetchInterval = 3 * 60 * 1000;
let ActlastFetchTime = 0;

module.exports = (db) => {
    const router = express.Router();

    router.post('/', Authenticate(db), async (req, res) => {
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

    router.get('/', async (req, res) => {
        if (Date.now() - ActlastFetchTime > TreefetchInterval) {
            const querySnapshot = await getDocs(query(collection(db, "Activities"), orderBy("timestamp", "asc")));
            ActData.Activities = [];
            querySnapshot.forEach((doc) => {
                ActData.Activities.push(doc.data());
            });
            const statRef = doc(db, "Status", "Activities");
            const statDocSnap = await getDoc(statRef);
            const data = statDocSnap.data();
            ActData.Static = data;
            ActlastFetchTime = Date.now();
        }
        res.send(ActData);
    });

    return {
        baseRoute: '/activities',
        router,
    };
};
