const express = require('express');
const ImageKit = require("imagekit");
require('dotenv').config();

const imagekit = new ImageKit({
    publicKey: process.env.KITPUBLICKEY,
    privateKey: process.env.PRIVATE_KITKEY,
    urlEndpoint: process.env.KITURLENDPOINT,
});

module.exports = (db) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        return res.send(imagekit.getAuthenticationParameters());
    });

    return {
        baseRoute: '/kitAuth',
        router,
    };
};
