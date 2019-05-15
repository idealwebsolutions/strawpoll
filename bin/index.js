#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));

if (argv._[0] === 'populate_fake') {
  const populate = require('./populate');

  switch (argv._[1]) {
    case 'comments':
      // # of comments, poll_id, author_id
      populate.createFakeComments(argv._[2], argv._[3], argv._[4]);
      break;
    case 'polls':
      // # of polls, user_id
      populate.createFakePolls(argv._[2], argv._[3]);
      break;
    case 'users':
      // # of users
      populate.createFakeUsers(argv._[2]);
      break;
    case 'views':
      populate.createFakeViews(argv._[2], argv._[3]);
      break;
    case 'votes':
      populate.createFakeVotes(argv._[2], argv._[3]);
      break;
    case 'tags':
      populate.createFakeTags(argv._[2]);
      break;
  }
} else if (argv._[0] === 'generate') {
  const generate = require('./generate');
  
  switch(argv._[1]) {
    case 'api_key':
      generate.newKey();
      break;
    case 'trending_polls':
      generate.trendingPolls();
      break;
    case 'newest_polls':
      generate.newestPolls();
      break;
  }
}
