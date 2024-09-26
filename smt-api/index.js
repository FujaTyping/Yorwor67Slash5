const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { collection, doc, getDoc, getDocs } = require("firebase/firestore");
const express = require("express");
const axios = require("axios");
const cors = require('cors')
require("dotenv").config();

const config = require("./config.json");
const exapp = express();
exapp.use(cors());
const port = config.port;

const firebaseConfig = {
    apiKey: process.env.ApiKey,
    authDomain: process.env.AuthDomain,
    projectId: process.env.ProjectId,
    storageBucket: process.env.StorageBucket,
    messagingSenderId: process.env.MessagingSenderId,
    appId: process.env.AppId,
    measurementId: process.env.MeasurementId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

app.use("/favicon.ico", express.static("./favicon.ico"));

exapp.get("/announcement", async (req, res) => {
    const docRef = doc(db, "Announcement", "Main");
    const docSnap = await getDoc(docRef);
    res.send(docSnap.data());
});

exapp.get("/homework", async (req, res) => {
    let RealData = {
        Homework: [],
    };
    const querySnapshot = await getDocs(collection(db, "Homework"));
    querySnapshot.forEach((doc) => {
        RealData.Homework.push(doc.data());
    });
    res.send(RealData);
});

exapp.get("/classcode", async (req, res) => {
    let RealData = {
        Classcode: [],
    };
    const querySnapshot = await getDocs(collection(db, "Classcode"));
    querySnapshot.forEach((doc) => {
        RealData.Classcode.push(doc.data());
    });
    res.send(RealData);
});

exapp.get("/absent", async (req, res) => {
    let RealData = {
        Absent: [],
    };
    const querySnapshot = await getDocs(collection(db, "Absent"));
    querySnapshot.forEach((doc) => {
        RealData.Absent.push(doc.data());
    });
    res.send(RealData);
});

exapp.use((req, res, next) => {
    res.status(404).send("There is no API here (404)");
});

exapp.listen(port, () => {
    console.log(`smt-site API is running on port : ${port}`);
});