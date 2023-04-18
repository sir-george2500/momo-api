# Momo API

This is a package to help easily integrate Momo API into your JavaScript project. It currently supports the following services:

- Collection API
- Disbursement API
- Remittance API

## Installation

To install Momo API, use npm:

```bash
npm install momo-api 
```

## Avaible Module for you 
```javascript
   const { createApiUser } = require("momo-api")
   const { createApiKey } = require("momo-api")
   const { colAccessToken } = require("momo-api")
   const { requestToPay } = require("momo-api")
   const { disAccessToken } = require("momo-api")
   const { disburseTransfer } = require("momo-api")
   const { remittAccessToken } = require("momo-api")
   const { remittTransfer } = require("momo-api")
   const {  uuidv4 } = require("momo-api");
   
```
## Usage

To use Momo API in your project you frist have to create a Api User , ApiKey and require the product you want
We use Express.js for this tutorial but feel free to use what ever framework please you 
also our product for this tutorial is Collection

Import the required modules from express and momo-api.
   ```javascript
require('dotenv').config();
const express = require("express");
const { createApiUser } = require("momo-api")
const { createApiKey } = require("momo-api")
//Product Details here 
const { colAccessToken } = require("momo-api")
const { requestToPay } = require("momo-api")
```
Create an instance of Express and assign it to the app variable.

```javascript
const app = express();
app.use(express.json());
```
Define some constants that are required to create an API user and an API key. In this case, the `xReferenceId` is a unique identifier for the transaction, the `subscriptionKey` is a subscription key provided by the API provider, the `targetEnvironment` is the environment (either sandbox or production), and the `providerCallbackHost` is the URL that the provider will send callbacks to.

```javascript
const xReferenceId = uuidv4();
const subscriptionKey = process.env.COLLECTION_SUBCRIPTION_KEY;
const targetEnvironment = "sandbox";
const providerCallbackHost = "Your-call-back-Host";
const port = 3000;
```

Define a route for creating an API user. When a POST request is sent to this endpoint, the createApiUser function from the momo-api library is called with the necessary parameters. If the API request is successful, the response data is sent back to the client. If there is an error, a 500 status code is returned with an error message.


```javascript
app.post("/api", async (req, res) => {
  try {
    const response = await createApiUser(
      url,
      xReferenceId,
      subscriptionKey,
      targetEnvironment,
      providerCallbackHost
    );
    res.json(response.data);
  } catch (error) {
    console.error("There was a problem with the API request:", error);
    res
      .status(500)
      .send({ error: "An error occurred while making the API request" });
  }
});
```
Define a route for creating an API key. When a POST request is sent to this endpoint, the `createApiKey` function from the `momo-api` library is called with the necessary parameters. If the API request is successful, the generated API key is stored in the `apiKey` variable and sent back to the client. If there is an error, a 500 status code is returned with an error message.

```javascript
let apiKey;

app.post("/api-key", async (req, res) => {
  try {
    const response = await createApiKey(
      apiKeyUrl,
      subscriptionKey,
      targetEnvironment,
      xReferenceId,
      providerCallbackHost
    );
    apiKey = response.apiKey;
    res.json(apiKey);
  } catch (error) {
    console.error("There was a problem with the API request:", error);
    res
      .status(500)
      .send({ error: "An error occurred while making the API request" });
  }
});
```

## Collection API
Getting Access Token
Use the colAccessToken function to generate an access token for the Collection API:
```javascript
app.post("/api-token", async (req, res) => {
  try {
    // Call the createAccessToken function and store the result in the accessToken variable
    accessToken = await colAccessToken(
      apiKey,
      momohost,
      subscriptionKey,
      xReferenceId
    );
    res.json(accessToken);
  } catch (error) {
    console.error("There was a problem with the API request:", error);
    res
      .status(500)
      .send({ error: "An error occurred while making the API request" });
  }
});
```
`requestToPay`
This function sends a request to pay to a specified mobile money user.
```javascript
app.post("/request-to-pay", async (req, res) => {
  try {
    // You will need to get the relevant data from the request body
    const { payer, payee, amount, currency, externalId, payerNote, payeeNote } = req.body;

     let callbackUrl = null; //I don't have a call back Url
    // Make the request-to-pay API call using the requestToPay function
    const momoResponse = await requestToPay(
      momohost,
      subscriptionKey,
      callbackUrl,
      targetEnvironment,
      payer,
      payee,
      amount,
      currency,
      externalId,
      payeeNote,
      payerNote,
      accessToken.access_token
    );

    // Handle the response appropriately
    console.log("MoMo response:", momoResponse);
    res.json(momoResponse);
  } catch (error) {
    console.error("Error making request-to-pay API request:", error);
    res.status(500).send({ error: "An error occurred while making the request-to-pay API request" });
  }
});
```

Here is the rest of the `server.js` code just if you need it we set the app to listen at port 3000

```javascript
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
```
Also Here is the Client.js Just if you need it have fun code 
```javascript
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

//     const response5 = await axios.post("http://localhost:3000/transfer", transferData, { headers });
// console.log(response5.status + "Transfer sent");

     const response4 = await axios.post("http://localhost:3000/request-to-pay", requestToPayData);
    console.log(response4.status + "Request to pay sent");
  } catch (error) {
    console.error("There was a problem with the axios operation:", error.response.status);
  }
})();
```

Don't forget to start the server run `node server.js` to test the client.js run `node server.js`

## License
This package is licensed under the MIT License.
