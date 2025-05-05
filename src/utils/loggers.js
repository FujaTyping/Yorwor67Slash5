const { generateID } = require('../lib/module');
const { setDoc, doc, serverTimestamp } = require('firebase/firestore');

const CLogger = async (db, method, user, message) => {
    const UID = generateID();

    await setDoc(doc(db, "Logs", `${UID}`), {
        Method: `${method}`,
        User: `${user}`,
        Message: `${message}`,
        timestamp: serverTimestamp(),
    });
};

module.exports = { CLogger };
