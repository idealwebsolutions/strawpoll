const faker = require('faker')

const { 
  PROVIDERS, 
  PERMISSIONS,
  ROLES,
  COMMENT_TYPE
} = require('../lib/constants')

const { 
  User,
  Poll, 
  Choice,
  Comment
} = require('../lib/db')

exports.createFakeComments = async (comments = 1, thread = false, poll = -1, author = -1) => {
  while (comments-- > 0) {
    let comment

    const fakeComment = {
      type: thread ? COMMENT_TYPE.Thread.key : COMMENT_TYPE.Post.key,
      poll: poll,
      author: author,
      content: faker.lorem.sentence()
      // upvotes: faker.random.number(20)
    }
    
    try {
      comment = await Comment.insert(
        fakeComment.content, fakeComment.poll, fakeComment.author, fakeComment.type
      )
    } catch (err) {
      return console.error(err)
    }

    console.log(`Comment created(${comment})`)
  }
}

exports.createFakeUsers = async (users = 1) => {
  while (users-- > 0) {
    let user
    
    const fakeUser = {
      provider: faker.random.arrayElement(PROVIDERS.enums).key.toLowerCase(),
      email: faker.internet.email(),
      screen_name: faker.internet.userName()
      // avatar: faker.internet.avatar(),
      // role: faker.random.arrayElement(ROLES.enums).key,
      // followers: faker.random.number()
    }

    try {
      user = await User.create(fakeUser)
    } catch (err) {
      return console.error(err)
    }

    console.log(`User created(${user})`)
  }
}

exports.createFakePolls = async (polls = 1, userid = -1) => {
  // required: questions, choices, permissions
  // optional: tags
  while (polls-- > 0) {
    let poll

    const submission = {
      question: faker.lorem.sentence().replace(/\.$/, '?'),
      answers: faker.random.words(2).split(' '),
      permissions: faker.random.arrayElement(PERMISSIONS.enums).key,
      user: {}
    }

    if (userid > 0) {
      submission['user']['id'] = userid
    }

    if (faker.random.boolean()) {
      submission['multiple'] = true
    }

    if (faker.random.boolean()) {
      submission['protect'] = true
    }

    if (faker.random.boolean()) {
      submission['tags'] = faker.random.words().replace(/\s/g, ',')
    }

    console.log(submission)

    try {  
      poll = await Poll.create(submission)
      await Choice.batchCreate(poll.id, submission.answers)
    } catch (err) {
      return console.error(err)
    }
    
    console.log(`created new poll(${poll.hash})`)
  }
}
