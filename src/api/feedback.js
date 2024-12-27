const express = require('express');
const axios = require("axios");

const webhookURL = process.env.DscWebhook;

module.exports = (db) => {
    const router = express.Router();

    router.post("/feedback", async (req, res) => {
      const YCS = req.body.ycs;
      const Email = req.body.email;
      const Decs = req.body.decs;
      const RatingUI = req.body.rating.ui;
      const RatingUX = req.body.rating.ux;
      const RatingI = req.body.rating.st;
      const RatingII = req.body.rating.nd;
      const RatingIII = req.body.rating.th;
      const RatingIV = req.body.rating.fu;
      if (!YCS || !Email || !Decs || !RatingI || !RatingII || !RatingIII || !RatingIV || !RatingUI || !RatingUX) {
        res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        const Payload = {
          "embeds": [
            {
              "title": "📥 มีความคิดเห็นใหม่สำหรับ Yorwor67Slash5",
              "color": 36863,
              "fields": [
                {
                  "name": "สถานภาพ",
                  "value": `${YCS}`,
                  "inline": true
                },
                {
                  "name": "อีเมล",
                  "value": `${Email}`,
                  "inline": true
                },
                {
                  "name": `คะแนนประเมิณ (⭐ ${req.body.ratingavg})`,
                  "value": `> **ประสบการณ์การใช้งานเว็ปไซต์ (UX)** : ⭐ **${RatingUX}**\n> **ความเรียบง่ายและสวยงามของเว็ปไซต์ (UI)** : ⭐ **${RatingUI}**\n> **เว็บไซต์ง่ายต่อการอ่านและการใช้งาน** : ⭐ **${RatingI}**\n> **ความสะดวกในการเชื่อมโยงข้อมูลภายในเว็บไซต์** : ⭐ **${RatingII}**\n> **มีการจัดหมวดหมู่ให้ง่ายต่อการค้นหา** : ⭐ **${RatingIII}**\n> **ระบบใช้งานสะดวกและไม่ซับซ้อน** : ⭐ **${RatingIV}**`
                },
                {
                  "name": "ข้อความ",
                  "value": `${Decs}`
                }
              ],
              "author": {
                "name": "SMT Notify",
                "url": "https://smt.siraphop.me/feedback",
                "icon_url": "https://upload.wikimedia.org/wikipedia/commons/6/6f/ตรีจักร.png"
              }
            }
          ]
        };
        axios.post(webhookURL, Payload)
          .then(response => {
            res.send(`เราได้รับคำขอของคุณแล้ว จะตอบกลับทางอีเมลที่ให้ไว้ในภายหลัง`);
          })
          .catch(error => {
            res.send(error.message);
          });
      }
    });

    return {
        baseRoute: '/feedback',
        router,
    };
};
