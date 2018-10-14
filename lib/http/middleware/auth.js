const express = require('express')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
// const RedditStrategy = require('passport-reddit').Strategy
const TwitchStrategy = require('passport-twitchtv').Strategy

const { User } = require('../../db')
const UserController = require('../controllers/user')

const app = express()

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(async (user, done) => await done(null, user))
// Since passport doesn't support promises (yet), use the callback
passport.deserializeUser(async (profile, done) => {
  let user
  
  try {
    user = await User.get(profile)
  } catch (err) {
    return done(err)
  }
  
  await done(null, user)
})

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL,
  includeEmail: true
}, UserController.findOrCreate))

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email']
}, UserController.findOrCreate))

/*passport.use(new RedditStrategy({
  clientID: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  callbackURL: process.env.REDDIT_CALLBACK_URL
}, UserController.findOrCreate))*/

passport.use(new TwitchStrategy({
  clientID: process.env.TWITCHTV_CLIENT_ID,
  clientSecret: process.env.TWITCHTV_CLIENT_SECRET,
  callbackURL: process.env.TWITCHTV_CALLBACK_URL,
  scope: 'user_read'
}, UserController.findOrCreate))

module.exports = app
