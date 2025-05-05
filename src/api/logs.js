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
                RealData.Logs.push(doc.data());
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
