const express = require('express');
const { collection, getDocs } = require('firebase/firestore');

let UserRealData = { user: [] };
let StuRealData = { user: [] };
let AdminlastFetchTime = 0;
let UserlastFetchTime = 0;
const fetchInterval = 5 * 60 * 1000;

async function getUserData(db) {
    if (Date.now() - AdminlastFetchTime > fetchInterval) {
        const querySnapshot = await getDocs(collection(db, 'Admin'));
        UserRealData.user = [];
        querySnapshot.forEach((doc) => {
            UserRealData.user.push(doc.id);
        });
        AdminlastFetchTime = Date.now();
    }
}

async function getStudentData(db) {
    if (Date.now() - UserlastFetchTime > fetchInterval) {
        const querySnapshot = await getDocs(collection(db, 'User'));
        StuRealData.user = [];
        querySnapshot.forEach((doc) => {
            StuRealData.user.push(doc.id);
        });
        UserlastFetchTime = Date.now();
    }
}

module.exports = (db) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        const Auth = req.get('Auth');

        await getUserData(db);
        await getStudentData(db);

        if (!Auth) {
            return res.status(400).send('ไม่พบอีเมลในการเข้าสู่ระบบ');
        } else {
            if (UserRealData.user.includes(Auth)) {
                return res.send('Admin');
            } else if (StuRealData.user.includes(Auth)) {
                return res.send('Student');
            } else {
                return res.status(400).send(
                    `อีเมล ${Auth} ไม่ได้รับอนุญาติให้แก้ไข / เพิ่มข้อมูลภายในเว็ปไซต์`
                );
            }
        }
    });

    return {
        baseRoute: '/permission',
        router,
    };
};
