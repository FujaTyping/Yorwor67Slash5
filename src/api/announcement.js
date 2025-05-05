const express = require('express');
const { doc, getDoc, updateDoc } = require('firebase/firestore');
const { Authenticate } = require('../utils/authenticate');
const { CLogger } = require('../utils/loggers');
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
            const user = req.body.user;

            if (!message || !user) {
                return res.status(400).send('กรุณากรอกข้อมูลให้ครบถ้วน');
            }

            const announcementRef = doc(db, 'Announcement', 'Main');
            await updateDoc(announcementRef, {
                Text: `${message}`,
            });

            CLogger(db, "PATCH", user, "แก้ไขประกาศเว็ปไชต์");
            res.send(`เป็น ${message}`);
        } catch (error) {
            res.status(500).send({ message: 'Error updating announcement', error: error.message });
        }
    });

    return {
        baseRoute: '/announcement',
        router,
    };
};
