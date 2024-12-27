const { collection, getDocs } = require('firebase/firestore');

let UserRealData = { user: [] };
let AdminlastFetchTime = 0;
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

const Authenticate = (db) => async (req, res, next) => {
    const Auth = req.get('Auth');
    await getUserData(db);
    if (!UserRealData.user.includes(Auth)) {
        return res.status(400).send(
            `อีเมล ${Auth} ไม่ได้รับอนุญาติให้แก้ไข / เพิ่มข้อมูลภายในเว็ปไซต์`,
        );
    }
    next();
};

module.exports = { Authenticate };
