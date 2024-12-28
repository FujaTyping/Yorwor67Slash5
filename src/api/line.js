const express = require('express');
const axios = require('axios');
const { Authenticate } = require('../utils/authenticate');
const { randomSticker } = require("../lib/module");
const LineAuth = process.env.LINEauth;

module.exports = (db) => {
    const router = express.Router();

    router.post('/announcement', Authenticate(db), async (req, res) => {
        const { date, author, message } = req.body;

        if (!date || !author || !message) {
            return res.status(400).send('กรุณากรอกข้อมูลให้ครบถ้วน');
        }

        const stickerID = randomSticker();
        const Linedata = {
            messages: [
                {
                    type: 'sticker',
                    packageId: `${stickerID.PID}`,
                    stickerId: `${stickerID.SID}`,
                },
                {
                    type: 'text',
                    text: `📣 ประกาศจาก ${author}\nณ วันที่ ${date}\n${message}`,
                },
            ],
        };

        try {
            await axios.post('https://api.line.me/v2/bot/message/broadcast', Linedata, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LineAuth}`,
                },
            });
            res.send('ไปยัง Line Official แล้ว!');
        } catch (error) {
            res.status(500).send(`เกิดข้อผิดพลาด: ${error.message}`);
        }
    });

    return {
        baseRoute: '/line',
        router,
    };
};