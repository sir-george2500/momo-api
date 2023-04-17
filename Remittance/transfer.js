const axios = require("axios");

const transfer = async (
  momoHost,
  subscriptionKey,
  targetEnvironment,
  payee,
  amount,
  currency,
  externalId,
  accessToken
) => {
  try {
    const payload = {
      amount,
      currency,
      externalId,
      payee: {
        partyIdType: payee.partyIdType,
        partyId: payee.partyId
      },
      payerMessage: 'Test transfer',
      payeeNote: 'Test transfer'
    };
    const config = {
      method: 'post',
      url: `https://${momoHost}/remittance/v1_0/transfer`,
      headers: {
        'X-Reference-Id': externalId,
        'X-Target-Environment': targetEnvironment,
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(payload),
      maxBodyLength: Infinity
    };
    // set the callbackUrl if the user provided one
    // if (callbackUrl) {
    //   config.headers["X-Callback-Url"] = callbackUrl;
    // }


    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error making transfer API request:", error);
    throw error;
  }
};

module.exports = { transfer };
