const stickersData = require('../data/stickers.json');

function generateID() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

function randomSticker() {
  const stickers = stickersData.stickers;
  const randomIndex = Math.floor(Math.random() * stickers.length);
  return stickers[randomIndex];
}

module.exports = { generateID, randomSticker };
