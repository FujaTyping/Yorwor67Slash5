const express = require('express');
const { doc, getDoc, updateDoc } = require('firebase/firestore');
const { Authenticate } = require('../utils/authenticate');
let AnnData = {};
let AnnLastFetchtime = 0;
const TreefetchInterval = 3 * 60 * 1000;

module.exports = (db) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        if (Date.now() - AnnLastFetchtime > TreefetchInterval) {
            const docRef = doc(db, 'Announcement', 'Main');
            const docSnap = await getDoc(docRef);
            AnnData.Text = docSnap.data().Text
            AnnLastFetchtime = Date.now();
        }
        res.send(AnnData);
    });

    router.patch('/', Authenticate(db), async (req, res) => {
        try {
            const message = req.body.msg;

            if (!message) {
                return res.status(400).send('กรุณากรอกข้อมูลให้ครบถ้วน');
            }

            const announcementRef = doc(db, 'Announcement', 'Main');
            if (req.body.isImg) {
                await updateDoc(announcementRef, {
                    Text: `${message}`,
                    IsImg: true,
                    Url: `${req.body.url}`,
                });
                res.send(`เป็น ${message} มีรูปภาพแนบด้วย`);
            } else {
                await updateDoc(announcementRef, {
                    Text: `${message}`,
                });
                res.send(`เป็น ${message}`);
            }
        } catch (error) {
            res.status(500).send({ message: 'Error updating announcement', error: error.message });
        }
    });

    return {
        baseRoute: '/announcement',
        router,
    };
};
