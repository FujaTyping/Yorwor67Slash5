const express = require('express');
const axios = require('axios');

module.exports = (db) => {
    const router = express.Router();

    router.get('/version', async (req, res) => {
        try {
            const response = await axios.get("https://api.github.com/repos/FujaTyping/Yorwor67Slash5/commits?sha=dev&per_page=1&page=1");

            const linkHeader = response.headers['link'];

            if (!linkHeader) {
                return res.status(400).send('No link header found');
            }

            const match = linkHeader.match(/page=(\d+)>; rel="last"/);

            if (match) {
                const version = match[1];
                return res.send({ version });
            } else {
                return res.status(400).send('No last page found in link header');
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error fetching from GitHub');
        }
    });

    return {
        baseRoute: '/github',
        router,
    };
};
