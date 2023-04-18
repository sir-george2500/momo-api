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

To use Momo API in your project you frist have to create a Api User and ApiKey 
We use Express.js for this immplementation so feel free to use what ever frame work please you 
   ```javascript
const express = require("express");
const { createApiUser } = require("momo-api")
const { createApiKey } = require("momo-api") 
   
const xReferenceId = uuidv4();
const subscriptionKey = process.env.COLLECTION_SUBCRIPTION_KEY;
const targetEnvironment = "sandbox";
const providerCallbackHost = "Your-call-back-Host";


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

```javascript
const { colAccessToken, requestToPay } = require('momo-api');
```

## Collection API
Getting Access Token
Use the colAccessToken function to generate an access token for the Collection API:

