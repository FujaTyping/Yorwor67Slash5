const express = require('express');
const axios = require("axios");
const { doc, getDoc, setDoc, deleteDoc } = require('firebase/firestore');
const { generateID } = require('../lib/module');

module.exports = (db) => {
  const router = express.Router();

  const sendWebhookNotification = async (webhookUrl, email = null) => {
    const Payload = {
      "embeds": [
        {
          "title": "🔗 เชื่อมการแจ้งเตือนกับ Yorwor67Slash5 เรียบร้อยแล้ว",
          "description": "คุณจะได้รับการแจ้งเตือนผ่าน Webhook นี้ เมื่อมีการแจ้งเตอนเข้ามา",
          "color": 36863,
          "author": {
            "name": "SMT Notify",
            "url": "https://smt.siraphop.me/notify",
            "icon_url": "https://upload.wikimedia.org/wikipedia/commons/6/6f/ตรีจักร.png"
          }
        }
      ]
    };
    
    try {
      await axios.post(webhookUrl, Payload);
      const UID = generateID();
      const webhookData = { WebhookUrl: webhookUrl };
      if (email) webhookData.Email = email;

      await setDoc(doc(db, "DiscordWebhooks", UID), webhookData);
      return UID;
    } catch (error) {
      throw new Error(`ไม่สามารถเพิ่มลิ้งค์นี้ไปยังการแจ้งเตือนได้ ${error}`);
    }
  };

  router.post("/new", async (req, res) => {
    const webhookUrl = req.body.hooks;
    if (!webhookUrl) return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");

    if (!(webhookUrl.includes('https://discordapp.com/api/webhooks') || webhookUrl.includes('https://discord.com/api/webhooks'))) {
      return res.status(400).send("กรุณากรอกลิ้งค์ให้ถูกต้อง");
    }

    try {
      const UID = await sendWebhookNotification(webhookUrl, req.body.email);
      res.send(`เพิ่มลิ้งค์ไปยังการแจ้งเตือนด้วยไอดี ${UID} แล้ว`);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  router.delete("/revoke", async (req, res) => {
    const dataId = req.body.hookid;
    if (!dataId) return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");

    try {
      const docRef = doc(db, "DiscordWebhooks", dataId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await deleteDoc(docRef);
        res.send(`ลบข้อมูลเรียบร้อยแล้ว`);
      } else {
        res.status(400).send(`ไม่พบข้อมูลไอดี ${dataId}`);
      }
    } catch (error) {
      res.status(500).send(`เกิดข้อผิดพลาดในการลบข้อมูล ${error}`);
    }
  });

  return {
    baseRoute: '/discord',
    router,
  };
};
