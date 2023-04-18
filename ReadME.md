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
We use Express.js for this tutorial but feel free to use what ever framework please you 

Import the required modules from express and momo-api.
   ```javascript
const express = require("express");
const { createApiUser } = require("momo-api")
const { createApiKey } = require("momo-api")
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

## Collection API
Getting Access Token
Use the colAccessToken function to generate an access token for the Collection API:

