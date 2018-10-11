const { 
  Poll, 
  API 
} = require('../lib/db');

exports.trendingPolls = async () => {
  let trending

  try {
    trending = await Poll.getTrending();
  } catch (err) {
    return console.error(err)
  }

  console.log(`Trending: ${trending}`)
}

exports.newKey = async () => {
  let key
  
  try {
    key = await API.generateNewKey(true);
  } catch (err) {
    return console.error(err)
  }

  console.log(`New API key generated: ${key}`)
};
