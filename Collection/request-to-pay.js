const axios = require("axios");

const requestToPay = async (
  momoHost,
  subscriptionKey,
  callbackUrl,
  targetEnvironment,
  payer,
  payee,
  amount,
  currency,
  externalId,
  payeeNote,
  payerMessage,
  accessToken
) => {
  try {
    const config = {
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "X-Reference-Id": externalId,
        Authorization: `Bearer ${accessToken}`,
        "X-Target-Environment": targetEnvironment,
        "Content-Type": "application/json",
        "X-Callback-Url": callbackUrl,
      },
    };
    const requestBody = {
      amount: amount,
      currency: currency,
      externalId: externalId,
      payer: {
        partyIdType: payer.partyIdType,
        partyId: payer.partyId,
      },
      payerMessage: payerMessage,
      payeeNote: payeeNote,
      payee: {
        partyIdType: payee.partyIdType,
        partyId: payee.partyId,
      },
      callbackUrl: callbackUrl,
    };
    const response = await axios.post(
      `https://${momoHost}/collection/v1_0/requesttopay`,
      requestBody,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error making request-to-pay API request:", error);
    throw error;
  }
};

module.exports = { requestToPay };