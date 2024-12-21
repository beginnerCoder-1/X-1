const axios = require("axios")

async function tiktok(link) {
  let url = `https://api.agatz.xyz/api/tiktok?url=${link}`
  try {
    const response = await axios.get(url)
    const data = response.data.data
    const videoUrlNoWatermark = data.data.find(item => item.type === "nowatermark").url
    return videoUrlNoWatermark
  } catch (error) {
    throw error;
  }
}

module.exports = tiktok;