const { doc, getDoc } = require('firebase/firestore');

async function isAdmin(db, KEY) {
    const docRef = doc(db, 'Admin', KEY);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
}

const Authenticate = (db) => async (req, res, next) => {
    const Auth = req.get('Auth');

    if (!await isAdmin(db, Auth)) {
        return res.status(400).send(
            `Invalid Credentials`,
        );
    }
    next();
};

module.exports = { Authenticate };
