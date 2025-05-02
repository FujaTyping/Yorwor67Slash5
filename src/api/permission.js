const express = require('express');
const { doc, getDoc } = require('firebase/firestore');

async function isAdmin(db, KEY) {
    const docRef = doc(db, 'Admin', KEY);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
}

async function isStudent(db, KEY) {
    const docRef = doc(db, 'User', KEY);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
}

module.exports = (db) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        const Auth = req.get('Auth');

        if (!Auth) {
            return res.status(400).send(`Invalid Credentials`);
        } else {
            if (await isAdmin(db, Auth)) {
                return res.send('Admin');
            } else if (await isStudent(db, Auth)) {
                return res.send('Student');
            } else {
                return res.status(400).send(
                    `Invalid Credentials`
                );
            }
        }
    });

    return {
        baseRoute: '/permission',
        router,
    };
};
