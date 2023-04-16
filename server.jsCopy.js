const express = require("express");
require('dotenv').config();
const app = express();
const { v4: uuidv4 } = require("uuid");
const { createApiUser } = require("./create-api-user");
const { createApiKey } = require("./create-apikey");
const { createAccessToken } = require("./Collection/create-accessToken");
const {requestToPay}=require("./Collection/request-to-pay")
const port = 3000;

app.use(express.json());

const url = "https://sandbox.momodeveloper.mtn.com/v1_0/apiuser";
const apiKeyUrl = url;
const xReferenceId = uuidv4();
const subscriptionKey = process.env.SUBSCRIPTION_KEY;
const targetEnvironment = "sandbox";
const providerCallbackHost =
  "https://webhook.site/7c6c8e50-bc68-41f1-9199-e7da5dac7ff3";

const momohost = "sandbox.momodeveloper.mtn.com";

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


const appData ={};
app.post("/api-key", async (req, res) => {
  try {
    const response = await createApiKey(
      apiKeyUrl,
      subscriptionKey,
      targetEnvironment,
      xReferenceId,
      providerCallbackHost
    );
    const apiKey = response.apiKey;
    appData.apiKey = apiKey;
    console.log(apiKey);
    const accessToken = await createAccessToken(
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

app.post("/api-token", async (req, res) => {
  try {   
    const accessToken = await createAccessToken(
      appData.apiKey,
      momohost,
      subscriptionKey,
      xReferenceId
    );
    appData.accessToken= accessToken.access_token;
  } catch (error) {
    console.error("There was a problem with the API request:", error);
    res
      .status(500)
      .send({ error: "An error occurred while making the API request" });
  }
});

//Request to pay 
app.post("/request-to-pay", async (req, res) => {
  try {
    // You will need to get the relevant data from the request body
    const { payer, payee, amount, currency, externalId, payerNote, payeeNote } = req.body;

    // Retrieve the access token from your appData object
    const accessToken = appData.accessToken;

    // Make the request-to-pay API call using the requestToPay function
    const momoResponse = await requestToPay(
      momohost,
      subscriptionKey,
      providerCallbackHost,
      targetEnvironment,
      payer,
      payee,
      amount,
      currency,
      externalId,
      payeeNote,
      payerNote,
      accessToken
    );

    // Handle the response appropriately
    console.log("MoMo response:", momoResponse);
    res.json(momoResponse);
  } catch (error) {
    console.error("Error making request-to-pay API request:", error);
    res.status(500).send({ error: "An error occurred while making the request-to-pay API request" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
