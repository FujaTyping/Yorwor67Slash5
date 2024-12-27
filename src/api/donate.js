const express = require('express');
const axios = require('axios');
const { collection, getDocs } = require('firebase/firestore');

let SupporterData = { donor: [] };
let DONORlastFetchTime = 0;
const TreefetchInterval = 5 * 60 * 1000;
const webhookURL = process.env.DscWebhook;

module.exports = (db) => {
    const router = express.Router();

    router.get('/list', async (req, res) => {
        try {
            if (Date.now() - DONORlastFetchTime > TreefetchInterval) {
                const querySnapshot = await getDocs(collection(db, 'Supporter'));
                SupporterData.donor = [];
                querySnapshot.forEach((doc) => {
                    SupporterData.donor.push(doc.data());
                });
                DONORlastFetchTime = Date.now();
            }
            res.send(SupporterData);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching donor data', error: error.message });
        }
    });

    router.post('/', async (req, res) => {
        const { name: Name, sendbank: SB, tranref: TR } = req.body;

        if (!Name || !SB || !TR) {
            return res.status(400).send('กรุณากรอกข้อมูลให้ครบถ้วน');
        }

        const Payload = {
            embeds: [
                {
                    title: '💰 มีสนับสนุนโปรเจค Yorwor67Slash5',
                    color: 36863,
                    fields: [
                        {
                            name: 'ชื่อผู้บริจาค',
                            value: `${Name}`,
                            inline: true
                        },
                        {
                            name: 'ธนาคาร (ผู้ส่ง)',
                            value: `${SB}`,
                            inline: true
                        },
                        {
                            name: 'หมายเลขทำรายการ',
                            value: `${TR}`
                        }
                    ],
                    author: {
                        name: 'SMT Notify',
                        url: 'https://smt.siraphop.me/about/web',
                        icon_url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/ตรีจักร.png'
                    }
                }
            ]
        };

        try {
            await axios.post(webhookURL, Payload);
            res.send('ส่งหลักฐานแล้ว');
        } catch (error) {
            res.status(500).send({ message: 'Error sending donation details', error: error.message });
        }
    });

    return {
        baseRoute: '/donate',
        router,
    };
};
