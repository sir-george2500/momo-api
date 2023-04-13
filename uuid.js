const axios = require('axios');

async function generateUUID() {
  try {
    const response = await axios.get('https://www.uuidgenerator.net/api/version1');
    const uuid = response.data.uuid;
    return uuid;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate UUID');
  }
}

module.exports = generateUUID;