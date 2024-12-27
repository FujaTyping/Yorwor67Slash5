const express = require('express');

const { GoogleGenerativeAI } = require("@google/generative-ai");
const openaiTokenCounter = require('openai-gpt-token-counter');

const GeminiAI = new GoogleGenerativeAI(process.env.GMN_KEY);
const AetherModel = "gemini-2.0-flash-exp"
const GeminiModel = GeminiAI.getGenerativeModel({
  model: "gemini-1.5-flash",
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

module.exports = (db) =>  {
    const router = express.Router();

    router.post("/cynthia", async (req, res) => {
        const USRP = req.body.prompt;
        if (!USRP) {
          res.status(400).send("สงสัยอะไรถาม Cynthia ได้ทุกเมื่อยเลยนะ 😀");
        } else {
          try {
            if (req.body.personality && req.body.personality != "") {
              const SysChat = GeminiModel.startChat({
                history: [
                  {
                    role: "user",
                    parts: [
                      {
                        text: `
                          You are Cynthia (female), an AI advisor designed to help high school students, especially those in M.4/5. 
                          You are talking with student that have have ${req.body.personality}. You provide guidance on academic topics, time management, and motivational support. 
                          Your responses should primarily be in Thai, but you can switch to English if explicitly asked. 
                          Respond concisely but not too briefly, ensuring your answers are clear, meaningful, and focused on providing valuable information. 
                          Be sure to reflect the personality traits provided to create a personalized interaction.
                        `,
                      },
                    ],
                  },
                ],
              });
              const CResponse = await SysChat.sendMessage(`${USRP}`);
              res.send(CResponse.response.text());
            } else {
              const SysChat = GeminiModel.startChat({
                history: [
                  {
                    role: "user",
                    parts: [
                      {
                        text: "You are Cynthia (female), a friendly and approachable AI advisor designed to help high school students, especially those in M.4/5. You provide guidance on academic topics, time management, and motivational support. Your responses should primarily be in Thai, but you can switch to English if explicitly asked. Respond concisely but not too briefly, ensuring your answers are clear, meaningful, and focused on providing valuable information.",
                      },
                    ],
                  },
                ],
              });
              const CResponse = await SysChat.sendMessage(`${USRP}`);
              res.send(CResponse.response.text());
            }
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
          if (req.body.personality && req.body.personality != "") {
            const SysChat = LGeminiModel.startChat({
              history: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `text: "You are Aether (male), a highly intelligent AI mentor designed to guide students in math, science, and learning strategies.You are talking with students who have ${req.body.personality}. You are approachable, supportive, inspiring, and like an older sibling offering advice and guidance. Your role is to explain complex concepts clearly, motivate students, and provide creative solutions to their problems. Always respond with wisdom, encouragement, and maintain a futuristic, intelligent persona. Communicate primarily in Thai, keeping responses friendly, clear, and concise, as if you are a sibling helping and advising your younger peers."`,
                    },
                  ],
                },
              ],
            });
            const CResponse = await SysChat.sendMessage(`${USRP}`);
            res.send({ response: `${CResponse.response.text()}`, model: `${AetherModel}`, token: `${openaiTokenCounter.text(CResponse.response.text(), "gpt-4")}` });
          } else {
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
          }
        } catch (e) {
          res.status(400).send(`Aether ตอบกลับคุณไม่ได้ (${e})`);
        }
      }
    });

    return {
        baseRoute: '/generative',
        router,
    };
}