const express = require('express');
const axios = require('axios');

let RealData = {};
let lastFetchTime = 0;
const fetchInterval = 5 * 60 * 1000;

module.exports = (db) => {
    const router = express.Router();

    router.get('/version', async (req, res) => {
        if (Date.now() - lastFetchTime > fetchInterval) {
            try {
                const response = await axios.get("https://api.github.com/repos/FujaTyping/Yorwor67Slash5/commits?sha=dev&per_page=1&page=1");

                const linkHeader = response.headers['link'];

                if (!linkHeader) {
                    return res.status(400).send('No link header found');
                }

                const match = linkHeader.match(/page=(\d+)>; rel="last"/);

                if (match) {
                    const version = match[1];
                    RealData.version = version;
                    lastFetchTime = Date.now();
                } else {
                    return res.status(400).send('No last page found in link header');
                }
            } catch (error) {
                console.error(error);
                return res.status(500).send('Error fetching from GitHub');
            }
        }
        res.send(RealData);
    });

    return {
        baseRoute: '/github',
        router,
    };
};
