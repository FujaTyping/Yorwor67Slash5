const express = require('express');
const axios = require("axios");

const webhookURL = "https://discord.com/api/webhooks/1297441080874373122/F1Mf1FUJM55yIDVKhSv0POCQrIfpfMpPygYHvwWK02krN7RfvUzjA4MdseQ4pKUNNLmS";

module.exports = (db) => {
  const router = express.Router();

  router.post("/", async (req, res) => {
    const { ycs, email, decs, rating } = req.body;
    const { ui: RatingUI, ux: RatingUX, st: RatingI, nd: RatingII, th: RatingIII, fu: RatingIV } = rating;

    const missingFields = [
      { name: 'สถานภาพ', value: ycs },
      { name: 'อีเมล', value: email },
      { name: 'สิ่งที่ต้องการจะให้ปรับปรุง', value: decs },
      { name: 'ความเรียบง่ายและสวยงามของเว็ปไซต์ (UI)', value: RatingUI },
      { name: 'ประสบการณ์การใช้งานเว็ปไซต์ (UX)', value: RatingUX },
      { name: 'เว็บไซต์ง่ายต่อการอ่านและการใช้งาน', value: RatingI },
      { name: 'ความสะดวกในการเชื่อมโยงข้อมูลภายในเว็บไซต์', value: RatingII },
      { name: 'มีการจัดหมวดหมู่ให้ง่ายต่อการค้นหา', value: RatingIII },
      { name: 'ระบบใช้งานสะดวกและไม่ซับซ้อน', value: RatingIV },
    ].filter(field => !field.value).map(field => field.name);

    if (missingFields.length) {
      return res.status(400).send(`กรุณากรอกข้อมูลให้ครบถ้วน: ${missingFields.join(', ')}`);
    }

    const Payload = {
      "embeds": [
        {
          "title": "📥 มีความคิดเห็นใหม่สำหรับ Yorwor67Slash5",
          "color": 36863,
          "fields": [
            { "name": "สถานภาพ", "value": ycs, "inline": true },
            { "name": "อีเมล", "value": email, "inline": true },
            {
              "name": `คะแนนประเมิณ (⭐ ${req.body.ratingavg})`,
              "value": `> **ประสบการณ์การใช้งานเว็ปไซต์ (UX)** : ⭐ **${RatingUX}**\n> **ความเรียบง่ายและสวยงามของเว็ปไซต์ (UI)** : ⭐ **${RatingUI}**\n> **เว็บไซต์ง่ายต่อการอ่านและการใช้งาน** : ⭐ **${RatingI}**\n> **ความสะดวกในการเชื่อมโยงข้อมูลภายในเว็บไซต์** : ⭐ **${RatingII}**\n> **มีการจัดหมวดหมู่ให้ง่ายต่อการค้นหา** : ⭐ **${RatingIII}**\n> **ระบบใช้งานสะดวกและไม่ซับซ้อน** : ⭐ **${RatingIV}**`
            },
            { "name": "ข้อความ", "value": decs }
          ],
          "author": {
            "name": "SMT Notify",
            "url": "https://smt.siraphop.me/feedback",
            "icon_url": "https://upload.wikimedia.org/wikipedia/commons/6/6f/ตรีจักร.png"
          }
        }
      ]
    };

    try {
      const response = await axios.post(webhookURL, Payload);

      if (response.status === 200 || response.status === 204) {
        res.send(`เราได้รับคำขอของคุณแล้ว จะตอบกลับทางอีเมลที่ให้ไว้ในภายหลัง`);
      } else {
        console.error("Error sending to Discord:", response.status, response.data);
        res.status(500).send("เกิดข้อผิดพลาดขณะส่งข้อมูลไปยัง Discord.");
      }
    } catch (error) {
      console.error("Error sending to Discord:", error.message);
      res.status(500).send(`Error: ${error.message}`);
    }
  });

  return {
    baseRoute: '/feedback',
    router,
  };
};
