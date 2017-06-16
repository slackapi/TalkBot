/**
 * Dependencies:
 * Dotenv, Express, BodyParser, Slack Web Client, Slack Events API
 */

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const WebClient = require('@slack/client').WebClient;
const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;


/**
 * Tokens:
 * Slack, Firebase, Twilio
 */

// Retrieve bot token from dotenv file
const bot_token = process.env.SLACK_BOT_TOKEN || '';
// Authorization token
const auth_token = process.env.SLACK_AUTH_TOKEN || '';
// Verification token for Events Adapter
const slackEvents = createSlackEventAdapter(process.env.SLACK_VERIFICATION_TOKEN);


/**
 * App Configuration:
 * Express, BodyParser, Firebase, Events API, Web Clients, Twilio
 */

// Slack web client
const web = new WebClient(auth_token);
const bot = new WebClient(bot_token);


// Post message to Slack
web.chat.postMessage('#general', 'Hello, world!', function(err, info) {
	if (err) console.log(err);
});