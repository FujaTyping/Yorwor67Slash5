const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require("cors");
require("dotenv").config();
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const config = require("./config.json");

const firebaseConfig = {
    apiKey: process.env.ApiKey,
    authDomain: process.env.AuthDomain,
    projectId: process.env.ProjectId,
    storageBucket: process.env.StorageBucket,
    messagingSenderId: process.env.MessagingSenderId,
    appId: process.env.AppId,
    measurementId: process.env.MeasurementId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const expressApp = express();
const PORT = config.port;

expressApp.use(cors());
expressApp.use(express.json());

const apiFolder = path.join(__dirname, '/src/api');

fs.readdirSync(apiFolder).forEach((file) => {
    if (file.endsWith('.js')) {
        const routePath = path.join(apiFolder, file);
        const routeModule = require(routePath);

        const routeConfig = typeof routeModule === 'function' ? routeModule(db) : routeModule;

        if (routeConfig && routeConfig.baseRoute && routeConfig.router) {
            expressApp.use(routeConfig.baseRoute, routeConfig.router);
            console.log(`Mounted route: ${routeConfig.baseRoute}`);
        } else {
            console.error(`Invalid route module: ${file}`);
        }
    }
});

expressApp.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

expressApp.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
