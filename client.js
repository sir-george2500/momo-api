const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const headers = {
  "Content-Type": "application/json"
};

const body = JSON.stringify({
  providerCallbackHost: "https://webhook.site/7c6c8e50-bc68-41f1-9199-e7da5dac7ff3"
});

const requestToPayData = {
  amount: "500",
  currency: "EUR",
  externalId: uuidv4(),
  payer: {
    partyIdType: "MSISDN",
    partyId: "256782181480"
  },
  payerMessage: "Test payment",
  payeeNote: "Payment for testing purposes",
  payee: {
    partyIdType: "MSISDN",
    partyId: "256782181481"
  }
};

const transferData = {
  amount: "200",
  currency: "EUR",
  externalId: uuidv4(),
  payee: {
    partyIdType: "MSISDN",
    partyId: "256782181481"
  },
  payerMessage: "Test transfer",
  payeeNote: "Test transfer",
};


(async () => {
  try {
    const response1 = await axios.post("http://localhost:3000/api", body, { headers });
    console.log(response1.status + "api user created ");

    const response2 = await axios.post("http://localhost:3000/api-key", body, { headers });
    console.log(response2.status + "Api Key created");

    const response3 = await axios.post("http://localhost:3000/api-token", body, { headers });
    console.log(response3.status + "Api Token Generated");

    const response5 = await axios.post("http://localhost:3000/transfer", transferData, { headers });
console.log(response5.status + "Transfer sent");

    //  const response4 = await axios.post("http://localhost:3000/request-to-pay", requestToPayData);
    // console.log(response4.status + "Request to pay sent");
  } catch (error) {
    console.error("There was a problem with the axios operation:", error.response.status);
  }
})();