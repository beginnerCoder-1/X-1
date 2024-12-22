const axios = require("axios");

async function bingImage(prompt) {
  const url = `https://ryzendesu.vip/api/ai/v2/text2img?prompt=${prompt}&model=`;
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer", 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = bingImage;
