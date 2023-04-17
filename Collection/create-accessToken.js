const axios = require("axios");

const colAccessToken = async (apiKey, momohost, subscriptionKey, apiUserId) => {
  try {
    const config = {
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        Authorization: `Basic ${Buffer.from(`${apiUserId}:${apiKey}`).toString("base64")}`,
      },
    };
    const response = await axios.post(`https://${momohost}/collection/token/`, null, config);
    return response.data;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
};

module.exports = { colAccessToken };
