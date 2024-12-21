const axios = require("axios");

async function brat(message) {
  let url = `https://vapis.my.id/api/bratv1?q=${message}`;
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = brat;