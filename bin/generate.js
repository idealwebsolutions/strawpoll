const { 
  Poll, 
  View,
  Vote,
  API 
} = require('../lib/db');

exports.trendingPolls = async () => {
  let latest

  try {
    latest = await Poll.getLastDay();
  } catch (err) {
    req.log.error(err);
    return next(err);
  }

  const merged = await Promise.all(latest.map(async (poll) => {
    const views = await View.count(poll.id);
    const votes = await Vote.count(poll.id);
    const hash = await Poll.encode(poll.id);
    
    console.log(hash)

    return Object.assign({}, poll, {
      views,
      votes,
      hash
    });
  }));
  
  try {
    trending = await Poll.getTrending(merged)
  } catch (err) {
    req.log.error(err);
    return next(err);
  }
  
  console.log(`Trending: ${trending.map((poll) => poll.id)}`)
};

exports.newestPolls = async () => {
  let newest

  try {
    newest = await Poll.getNewestEntries();
  } catch (err) {
    req.log.error(err);
    return next(err);
  }

  const merged = await Promise.all(newest.map(async (poll) => {
    const views = await View.count(poll.id);
    const votes = await Vote.count(poll.id);
    const hash = await Poll.encode(poll.id);

    return Object.assign({}, poll, {
      views,
      votes,
      hash
    });
  }));

  console.log(`Newest: ${newest.map((poll) => poll.id)}`)
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
