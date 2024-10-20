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
        const Payload = {
            "embeds": [
                {
                    "color": 16711680,
                    "image": {
                        "url": "https://smt.siraphop.me/assets/lineOA/NewHomework.png"
                    }
                },
                {
                    "title": "📣 แจ้งเตือนการบ้านใหม่ !! (New work)",
                    "color": 16711680,
                    "fields": [
                        {
                            "name": "วันที่",
                            "value": `${Time}`,
                            "inline": true
                        },
                        {
                            "name": "วันกำหนดส่ง",
                            "value": `${Due}`,
                            "inline": true
                        },
                        {
                            "name": "วิชา",
                            "value": `${Subject}`
                        },
                        {
                            "name": "ลายละเอียดงาน",
                            "value": `${Decs}`
                        }
                    ],
                    "author": {
                        "name": "SMT Notify",
                        "url": "https://smt.siraphop.me/homework",
                        "icon_url": "https://talent.siraphop.me/cdn/Yorwor.png"
                    }
                }
            ]
        };
        axios.post(Url, Payload)
            .catch(error => {
                console.log(error.message);
            });
    });
}

module.exports = notifyHomework;