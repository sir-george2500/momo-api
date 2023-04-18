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
```
## Usage

To use Momo API in your project you frist have to create a Api User and ApiKey 
   ```javascript
   const { createApiUser } = require("momo-api")
   const { createApiKey } = require("momo-api") 
   ```


```javascript
const { colAccessToken, requestToPay } = require('momo-api');
```

## Collection API
Getting Access Token
Use the colAccessToken function to generate an access token for the Collection API:

