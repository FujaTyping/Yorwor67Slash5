const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const openaiTokenCounter = require('openai-gpt-token-counter');

const GeminiAI = new GoogleGenerativeAI(process.env.GMN_KEY);
const AetherModel = "gemini-2.0-flash-exp"
const CynthiaModel = "gemini-2.0-flash-lite";
const GeminiModel = GeminiAI.getGenerativeModel({
    model: CynthiaModel,
    generationConfig: {
        maxOutputTokens: 512,
        temperature: 1,
    },
});
const LGeminiModel = GeminiAI.getGenerativeModel({
    model: AetherModel,
    generationConfig: {
        maxOutputTokens: 1024,
        temperature: 1,
    },
});

module.exports = () => {
    const router = express.Router();

    router.post("/cynthia", async (req, res) => {
        const USRP = req.body.prompt;
        if (!USRP) {
            res.status(400).send("สงสัยอะไรถาม Cynthia ได้ทุกเมื่อยเลยนะ 😀");
        } else {
            try {
                const SysChat = GeminiModel.startChat({
                    history: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: "คุณคือซินเทีย เรเวนเฮิร์ต (เพศหญิง) เป็น AI ที่เป็นมิตรและเข้าถึงง่าย ออกแบบมาเพื่อช่วยเหลือนักเรียนมัธยมปลายอย่างคุณ! ฉันสามารถให้คำแนะนำเกี่ยวกับวิชาการ การจัดการเวลา และกำลังใจเล็กๆ น้อยๆ ได้ โดยจะตอบเป็นภาษาไทยเท่านั้น หากคุณต้องการใช้ภาษาอังกฤษ โปรดแจ้งให้ฉันทราบ ฉันจะตอบสั้น กระชับ และให้ข้อมูลที่มีประโยชน์มากที่สุดเสมอ",
                                },
                            ],
                        },
                    ],
                });
                const CResponse = await SysChat.sendMessage(`${USRP}`);
                res.json({ response: CResponse.response.text(), model: CynthiaModel });
            } catch (e) {
                res.status(400).send(`Cynthia ตอบกลับคุณไม่ได้ (${e})`);
            }
        }
    });

    router.post("/aether", async (req, res) => {
        const USRP = req.body.prompt;
        if (!USRP) {
            res.status(400).send("ติดปัญหาตรงไหน? ถาม Aether ได้เลย เดี๋ยวจัดให้! 😎");
        } else {
            try {
                const SysChat = LGeminiModel.startChat({
                    history: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: "You are Aether (male), a highly intelligent AI mentor designed to guide students in math, science, and learning strategies. You are approachable, supportive, inspiring, and like an older sibling offering advice and guidance. Your role is to explain complex concepts clearly, motivate students, and provide creative solutions to their problems. Always respond with wisdom, encouragement, and maintain a futuristic, intelligent persona. Communicate primarily in Thai, keeping responses friendly, clear, and concise, as if you are a sibling helping and advising your younger peers."
                                },
                            ],
                        },
                    ],
                });
                const CResponse = await SysChat.sendMessage(`${USRP}`);
                res.send({ response: `${CResponse.response.text()}`, model: `${AetherModel}`, token: `${openaiTokenCounter.text(CResponse.response.text(), "gpt-4")}` });
            } catch (e) {
                res.status(400).send(`Aether ตอบกลับคุณไม่ได้ (${e})`);
            }
        }
    });

    return {
        baseRoute: '/generative',
        router,
    };
};
