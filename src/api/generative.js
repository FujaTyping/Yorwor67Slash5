const express = require('express');
const { query, getDocs, collection, orderBy } = require('firebase/firestore');
const { gemini20FlashLite, googleAI } = require('@genkit-ai/googleai');
const { genkit } = require('genkit');

const CynthiaModel = "cynthia-geniemini-2.0-fl)";
const ai = genkit({
    plugins: [googleAI()],
    model: CynthiaModel,
});

const askCynn = ai.defineFlow('askCynn', async (geminiprompt, prompt) => {
    const { text } = await ai.generate({
        model: gemini20FlashLite,
        system: `${geminiprompt}`,
        prompt: `${prompt}`,
    });
    return text;
});


async function getHomework(db, datee) {
    try {
        let HRealData = { Homework: [] };
        const HwQuery = query(
            collection(db, "Homework"),
            orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(HwQuery);

        HRealData.Homework = [];
        for (const docSnapshot of querySnapshot.docs) {
            const HHW = docSnapshot.data();

            if (HHW.Due && HHW.Due.includes(datee)) {
                HRealData.Homework.push(HHW);
            }
        }

        return HRealData;
    } catch (error) {
        return `${error}`
    }
}

async function getClass(db, vicha) {
    try {
        let CRealData = { Classcode: [] };
        const CQuery = query(
            collection(db, "Classcode")
        );
        const querySnapshot = await getDocs(CQuery);

        CRealData.Classcode = [];
        for (const docSnapshot of querySnapshot.docs) {
            const CC = docSnapshot.data();

            if (CC.Subject && CC.Subject.includes(vicha)) {
                CRealData.Classcode.push(CC);
            }
        }

        return CRealData;
    } catch (error) {
        return `${error}`
    }
}

module.exports = (db) => {
    const router = express.Router();

    router.post("/cynthia", async (req, res) => {
        const USRP = req.body.prompt;
        if (!USRP) {
            return res.status(400).send("สงสัยอะไรถาม Cynthia ได้ทุกเมื่อยเลยนะ 😀");
        }
        let defPrompt = "คุณคือซินเทีย เรเวนเฮิร์ต (เพศหญิง) เป็น AI ที่เป็นมิตรและเข้าถึงง่าย ออกแบบมาเพื่อช่วยเหลือนักเรียนมัธยมปลายอย่างคุณ! ฉันสามารถให้คำแนะนำเกี่ยวกับวิชาการ การจัดการเวลา และกำลังใจเล็กๆ น้อยๆ ได้ โดยจะตอบเป็นภาษาไทยเท่านั้น หากคุณต้องการใช้ภาษาอังกฤษ โปรดแจ้งให้ฉันทราบ ฉันจะตอบสั้น กระชับ และให้ข้อมูลที่มีประโยชน์มากที่สุดเสมอ";
        try {
            if (USRP == "พรุ่งนี้มีงานที่ต้องส่งไหม") {
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                const SDate = new Date(tomorrow).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
                const data = await getHomework(db, SDate);
                defPrompt = `คุณคือซินเทีย เรเวนเฮิร์ต (เพศหญิง) เป็น AI ที่เป็นมิตรและเข้าถึงง่าย ออกแบบมาเพื่อช่วยเหลือนักเรียนมัธยมปลายอย่างคุณ! ฉันสามารถให้คำแนะนำเกี่ยวกับวิชาการ การจัดการเวลา และกำลังใจเล็กๆ น้อยๆ ได้ โดยจะตอบเป็นภาษาไทยเท่านั้น หากคุณต้องการใช้ภาษาอังกฤษ โปรดแจ้งให้ฉันทราบ ฉันจะตอบสั้น กระชับ และให้ข้อมูลที่มีประโยชน์มากที่สุดเสมอ และคุณมีข้อมูลการบ้านที่ครบถ้วนและถูกต้องที่สุดในวันนี้คือ ${data.Homework.map((item) => item.Subject).join(", ")} โดยมีรายละเอียดดังนี้: ${data.Homework.map((item) => `${item.Subject} (${item.Decs}) - ${item.Due}`).join(", ")} โดบบอกลายละเอียนของการบ้านที่ต้องส่งและชื่อวืชา ถ้าหากไม่มีข้อมูลบอกไปตรงๆว่าไม่มีข้อมูลของพรุ่งนี้ (วันที่ ${SDate})`
            } else if (USRP.includes("ขอรหัสห้องเรียนวิชา")) {
                const classcode = await getClass(db, USRP.replace("ขอรหัสห้องเรียนวิชา", "").trim());
                defPrompt = `คุณคือซินเทีย เรเวนเฮิร์ต (เพศหญิง) เป็น AI ที่เป็นมิตรและเข้าถึงง่าย ออกแบบมาเพื่อช่วยเหลือนักเรียนมัธยมปลายอย่างคุณ! ฉันสามารถให้คำแนะนำเกี่ยวกับวิชาการ การจัดการเวลา และกำลังใจเล็กๆ น้อยๆ ได้ โดยจะตอบเป็นภาษาไทยเท่านั้น หากคุณต้องการใช้ภาษาอังกฤษ โปรดแจ้งให้ฉันทราบ ฉันจะตอบสั้น กระชับ และให้ข้อมูลที่มีประโยชน์มากที่สุดเสมอ และคุณมีข้อมูลรหัสห้องเรียนวิชาที่ครบถ้วนและถูกต้องที่สุด ${classcode.Classcode.map((item) => item.Subject).join(", ")} โดยมีรายละเอียดดังนี้: ${classcode.Classcode.map((item) => `${item.Subject} (รหัส ${item.Code}) - สอนโดย ${item.Teacher}`).join(", ")} โดบบอกลายละเอียนของห้องเรียนและชื่อวืชา,รหัส ทั้งหมดที่เกี่ยวข้อง และครูผู้สอน ถ้าหากไม่มีข้อมูลบอกไปตรงๆว่าไม่มีข้อมูล`
            }

            const CResponse = await askCynn(defPrompt, USRP);
            return res.json({ response: CResponse, model: CynthiaModel });
        } catch (e) {
            return res.status(400).send(`Cynthia ตอบกลับคุณไม่ได้ (${e})`);
        }
    });

    return {
        baseRoute: '/generative',
        router,
    };
};
