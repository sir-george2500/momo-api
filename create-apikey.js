const axios = require("axios");

const createApiKey = async (url, subscriptionKey, targetEnvironment, apiUserId ,callbackHost) => {
  const config = {
    headers: {
      "Ocp-Apim-Subscription-Key": subscriptionKey,
    },
  };

  const data = {
    providerCallbackHost: callbackHost,
    targetEnvironment: targetEnvironment,
  };

  try {
    const response = await axios.post(`${url}/${apiUserId}/apikey`, data, config);
    return response.data;
  } catch (error) {
    console.error("Error generating API key:", error);
    throw error;
  }
};

module.exports = { createApiKey };
