const axios = require("axios");

const createApiUser = async (
  url,
  xReferenceId,
  subscriptionKey,
  targetEnvironment,
  providerCallbackHost
) => {
  const headers = {
    "Content-Type": "application/json",
    "X-Reference-Id": xReferenceId,
    "Ocp-Apim-Subscription-Key": subscriptionKey,
    "targetEnvironment":targetEnvironment

  };

  const data = {
    providerCallbackHost: providerCallbackHost,
  };

  const response = await axios.post(url, data, {
    headers: headers,
  });

  return response;
};

module.exports = {
  createApiUser,
};
