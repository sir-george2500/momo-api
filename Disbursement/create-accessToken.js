const axios = require("axios");
const disAccessToken = async (apiKey, momohost, subscriptionKey, apiUserId) => {
    try {
      const config = {
        headers: {
          "Ocp-Apim-Subscription-Key": subscriptionKey,
          Authorization: `Basic ${Buffer.from(`${apiUserId}:${apiKey}`).toString("base64")}`,
        },
      };
      const response = await axios.post(`https://${momohost}/disbursement/token/`, null, config);
      return response.data;
    } catch (error) {
      console.error("Error generating access token:", error);
      throw error;
    }
  };
  
  module.exports = { disAccessToken };
  