const { API } = require('../lib/db');

module.exports = async () => {
  let key
  
  try {
    key = await API.generateNewKey(true);
  } catch (err) {
    return console.error(err)
  }

  console.log(`New API key generated: ${key}`)
};
