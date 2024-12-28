const express = require("express");
const { getDocs, collection } = require('firebase/firestore');

const fetchInterval = 5 * 60 * 1000;
let WheellastFetchTime = 0;

let WheelRealData = {
    StudentData: [],
};

module.exports = (db) => {
    const router = express.Router();

    router.get("/data", async (req, res) => {
        try {
            if (Date.now() - WheellastFetchTime > fetchInterval) {
                WheelRealData.StudentData = [];

                const querySnapshot = await getDocs(collection(db, "Wheel"));
                
                querySnapshot.forEach((doc) => {
                    WheelRealData.StudentData.push(doc.data());
                });

                WheellastFetchTime = Date.now();
            }

            res.send(WheelRealData);

        } catch (error) {
            console.error("Error fetching Wheel data:", error);
            res.status(500).send("เกิดข้อผิดพลาดขณะดึงข้อมูล Wheel");
        }
    });

    return {
        baseRoute: '/wheel',
        router,
    };
};
