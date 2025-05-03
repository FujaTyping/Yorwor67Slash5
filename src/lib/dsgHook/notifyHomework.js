const axios = require("axios");
const {
    collection,
    getDocs,
} = require("firebase/firestore");
require("dotenv").config();

async function notifyHomework(db, Time, Subject, Decs, Due) {
    const querySnapshot = await getDocs(collection(db, "DiscordWebhooks"));
    querySnapshot.forEach((doc) => {
        const Url = doc.data().WebhookUrl
        const Payload = {
            "embeds": [
                {
                    "color": 16118000,
                    "image": {
                        "url": "https://smt.siraphop.me/media/AssignmentNotify.png"
                    }
                },
                {
                    "title": `📣  แจ้งเตือนภาระงานวิชา ${Subject}`,
                    "color": 16118000,
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
                            "name": "ลายละเอียดงาน",
                            "value": `${Decs}`
                        }
                    ],
                    "author": {
                        "name": "SMT Notify",
                        "url": "https://smt.siraphop.me/assignment",
                        "icon_url": "https://smt.siraphop.me/media/SMTNotify.png"
                    },
                    "footer": {
                        "text": "อย่าลืมตรวจสอบรายละเอียดและส่งงานให้ตรงเวลานะคะ!"
                    }
                }
            ]
        };
        axios.post(Url, Payload)
            .then(response => {
                console.log(`Successfully broadcast to Discord`);
            })
            .catch(error => {
                console.log(error.message);
            });
    });
}

module.exports = notifyHomework;