const express = require('express');
const { getDocs, query, collection, orderBy } = require('firebase/firestore');
const { Authenticate } = require('../utils/authenticate');

module.exports = (db) => {
    const router = express.Router();

    router.get('/', Authenticate(db), async (req, res) => {
        let RealData = { Logs: [] };
        try {
            const querySnapshot = await getDocs(query(collection(db, "Logs"), orderBy("timestamp", "desc")));
            RealData.Logs = [];
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                data.Time = data.timestamp.toDate().toLocaleString('th-TH', { dateStyle: 'long', timeStyle: 'medium' });
                RealData.Logs.push(data);
            });
        } catch (e) {
            return res.status(500).send(`Error fetching logs data: ${e.message}`);
        }
        res.send(RealData);
    });

    return {
        baseRoute: '/logs',
        router,
    };
};
