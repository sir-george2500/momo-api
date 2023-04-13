const axios = require("axios");

const headers = {
  "Content-Type": "application/json"
};

const body = JSON.stringify({
  providerCallbackHost: "https://webhook.site/7c6c8e50-bc68-41f1-9199-e7da5dac7ff3"
});

(async () => {
  try {
    const response1 = await axios.post("http://localhost:3000/api", body, { headers });
    console.log(response1.status + "api user created ");

    const response2 = await axios.post("http://localhost:3000/api-key", body, { headers });
    console.log(response2.status + "Api Key created");
  } catch (error) {
    console.error("There was a problem with the axios operation:", error.response.status);
  }
})();
