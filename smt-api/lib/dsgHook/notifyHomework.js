const axios = require("axios");
const { initializeApp } = require("firebase/app");
const {
    collection,
    getDocs,
    getFirestore

} = require("firebase/firestore");
require("dotenv").config();

const firebaseConfig = {
    apiKey: process.env.ApiKey,
    authDomain: process.env.AuthDomain,
    projectId: process.env.ProjectId,
    storageBucket: process.env.StorageBucket,
    messagingSenderId: process.env.MessagingSenderId,
    appId: process.env.AppId,
    measurementId: process.env.MeasurementId,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function notifyHomework(Time, Subject, Decs, Due) {
    const querySnapshot = await getDocs(collection(db, "DiscordWebhooks"));
    querySnapshot.forEach((doc) => {
        const Url = doc.data().WebhookUrl
        const Payload = {};
        axios.post(Url, Payload)
            .catch(error => {
                console.log(error.message);
            });
    });
}

module.exports = notifyHomework;