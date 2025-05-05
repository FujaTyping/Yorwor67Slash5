const { generateID } = require('../lib/module');
const { setDoc, doc, serverTimestamp } = require('firebase/firestore');

const CLogger = async (db, method, user, message) => {
    const UID = generateID();

    const CDate = new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    await setDoc(doc(db, "Logs", `${UID}`), {
        Method: `${method}`,
        User: `${user}`,
        Message: `${message}`,
        Time: `${CDate}`,
        timestamp: serverTimestamp(),
    });
};

module.exports = { CLogger };
