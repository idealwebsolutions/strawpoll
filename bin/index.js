#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));

if (argv._[0] === 'populate_fake') {
  const populate = require('./populate');
  
  if (argv._[1] === 'comments') {
    // # of comments, is_thread, poll_id, author_id
    populate.createFakeComments(argv._[2], argv._[3], argv._[4], argv._[5]);
  }

  if (argv._[1] === 'polls') {
    populate.createFakePolls(argv._[2], argv._[3]);
  }

  if (argv._[1] === 'users') {
    populate.createFakeUsers(argv._[2]);
  }
}

if (argv._[0] === 'generate') {
  const generate = require('./generate');

  if (argv._[1] === 'api_key') {
    generate.newKey();
  }

  if (argv._[1] === 'trending_polls') {
    generate.trendingPolls();
  }
}
