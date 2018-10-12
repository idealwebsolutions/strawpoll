const { 
  Poll, 
  API 
} = require('../lib/db');

exports.trendingPolls = async () => {
  /*let trending

  try {
    await Poll.getTrending();
  } catch (err) {
    return console.error(err);
  }*/

  // console.log(`Trending: ${trending}`)
};

exports.newestPolls = async () => {
  /*let newest
  
  try {
    newest = await Poll.getNewest();
  } catch (err) {
    return console.error(err);
  }

  console.log(newest)*/
};

exports.newKey = async () => {
  let key
  
  try {
    key = await API.generateNewKey(true);
  } catch (err) {
    return console.error(err)
  }

  console.log(`New API key generated: ${key}`)
};
