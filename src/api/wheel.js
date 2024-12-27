const express = require("express")
const { getDocs, collection } = require('firebase/firestore');

const fetchInterval = 5 * 60 * 1000;
let WheellastFetchTime = 0;

let WheelRealData = {
    StudentData: [],
};

module.exports = (db) => {
    const router = express.Router()

    router.get("/data", async (req, res) => {
      if (Date.now() - WheellastFetchTime > fetchInterval) {
        const querySnapshot = await getDocs(collection(db, "Wheel"));
        querySnapshot.forEach((doc) => {
          WheelRealData.StudentData.push(doc.data());
        });
        WheellastFetchTime = Date.now();
      }
      res.send(WheelRealData);
    });

    return {
        baseRoute: '/wheel',
        router,
    };
}