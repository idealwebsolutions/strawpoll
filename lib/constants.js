const Enum = require('enum')
// App
exports.APP_NAME = 'strawpoll'
exports.RECAPTCHA_SITE_KEY = '6Lcdh2wUAAAAAKJsDiA0gurMkezQKlOQC9yvrvgw'
// Users
exports.USERS_TABLE_NAME = 'users'
exports.DEFAULT_USER_READ_FIELDS = ['id', 'email', 'display_name', 'avatar']
exports.MAX_EMAIL_ADDRESS_BOUNDARY = 32
exports.ROLES = new Enum({
  'Guest': 0,
  'Registered': 1,
  'Admin': 2
})
exports.PROVIDERS = new Enum({
  'Twitter': 0,
  'Google': 1,
  'Reddit': 2,
  'Twitchtv': 3
})
// Followers
exports.FOLLOWERS_TABLE_NAME = 'followers'
// Poll
exports.POLLS_TABLE_NAME = 'polls'
exports.DEFAULT_POLL_READ_FIELDS = ['id', 'owned', 'status', 'created', 'expiry', 'permission', 'question', 'multiple', 'public', 'protect']
exports.MIN_QUESTION_BOUNDARY = 2 // min question length
exports.MAX_QUESTION_BOUNDARY = 32 // max question length
exports.VALID_QUESTION_SEQUENCE = /^([^\s\?]+ ?)+\?{1}$/
//
const BASE_POLL_SCHEMA = {
  required: true,
  type: 'object',
  properties: {
    question: {
      required: true,
      type: 'string'
    },
    choices: {
      required: true,
      type: 'array'
    },
    multiple: {
      required: false,
      type: 'string'
    },
    private: {
      required: false,
      type: 'string'
    },
    protect: {
      required: false,
      type: 'string'
    },
    tags: {
      required: false,
      type: 'string'
    },
    permissions: {
      required: true,
      type: 'string'
    },
    expiry: {
      required: false,
      type: 'string'
    }
  }
}
exports.POLL_SUBMISSION_SCHEMA = Object.assign({}, BASE_POLL_SCHEMA, {
  properties: Object.assign({}, BASE_POLL_SCHEMA.properties, {
    _csrf: {
      required: true,
      type: 'string'
    }
  })
})
exports.POLL_CREATION_SCHEMA = Object.assign({}, BASE_POLL_SCHEMA, {
  properties: Object.assign({}, BASE_POLL_SCHEMA.properties, {
    api_key: {
      required: true,
      type: 'string'
    }
  })
})
exports.STATUS = new Enum({
  'Inactive': 0,
  'Active': 1,
  'Deleted': 2,
  'Banned': 3
})
exports.PERMISSIONS = new Enum({
  'Low': 0,
  'Moderate': 1,
  'High': 2
})
// Choices
exports.CHOICES_TABLE_NAME = 'choices'
exports.VALID_CHOICE_SEQUENCE = /^(\S+ ?)+$/g
exports.MAX_CHOICES_LIMIT = 12
exports.MIN_VALID_CHOICES_BOUNDARY = 2
exports.MAX_VALID_CHOICES_BOUNDARY = 12
exports.MAX_VALID_CHOICE_CHARACTER_LENGTH = 64
// Votes
exports.VOTES_TABLE_NAME = 'votes'
exports.VOTE_SUBMISSION_SCHEMA = {
  required: true,
  type: 'object',
  properties: {
    choice: {
      required: true,
      type: 'string'
    },
    'g-recaptcha-response': {
      required: false,
      type: 'string'
    },
    _csrf: {
      required: true,
      type: 'string'
    }
  }
}
// Tags
exports.TAGS_TABLE_NAME = 'tags'
exports.MAX_TAGS_INPUTS = 5
// Comments
exports.COMMENTS_TABLE_NAME = 'comments'
exports.MAX_COMMENT_CHARACTER_LENGTH = 128
exports.COMMENT_TYPE = new Enum({
  'Thread': 0,
  'Post': 1
})
// Views
exports.VIEWS_TABLE_NAME = 'views'
// API keys
exports.API_KEYS_TABLE_NAME = 'api_keys'
// Noop
exports.NOOP = () => {}
// API routes
const API_VERSION = 'v1'
// Polls collection API ROUTES
exports.POLLS_API_TRENDING_ENDPOINT = `/${API_VERSION}/polls/trending`
exports.POLLS_API_NEWEST_ENDPOINT = `/${API_VERSION}/polls/newest`
// Poll resources API routes
exports.POLL_API_FETCH_ENDPOINT = `/${API_VERSION}/poll/:hash`
exports.POLL_API_PATCH_ENDPOINT = `/${API_VERSION}/poll/:hash`
exports.POLL_API_DELETE_ENDPOINT = `/${API_VERSION}/poll/:hash`
exports.POLL_API_CREATE_ENDPOINT = `/${API_VERSION}/poll`
// Normal Routes
exports.BASE_ROUTE = '/'
exports.POLL_ROUTE = '/:hash'
exports.LIVE_RESULTS_ROUTE = '/live/:hash'
// User routes
exports.LOGOUT_ROUTE = '/logout'
exports.DASHBOARD_SUMMARY_ROUTE = '/dashboard'
exports.DASHBOARD_DRAFTS_ROUTE = '/dashboard/drafts'
// Authentication routes
exports.TWITTER_LOGIN = '/twitter'
exports.TWITTER_AUTHENTICATE = '/twitter/authenticate'
exports.GOOGLE_LOGIN = '/google'
exports.GOOGLE_AUTHENTICATE = '/google/authenticate'
exports.REDDIT_LOGIN = '/reddit'
exports.REDDIT_AUTHENTICATE = '/reddit/authenticate'
exports.TWITCHTV_LOGIN = '/twitchtv'
exports.TWITCHTV_AUTHENTICATE = '/twitchtv/authenticate'
