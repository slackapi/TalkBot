/**
 * Dependencies:
 * Dotenv, Express, BodyParser, Slack Web Client, Slack Events API
 */

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const WebClient = require('@slack/client').WebClient;
const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
var twilio = require('twilio');


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

// Creates our express app
const app = express();
// Use BodyParser for app
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Slack web client
const web = new WebClient(auth_token);
const bot = new WebClient(bot_token);

// The port we'll be using for our Express server
const PORT = 4390;

// The channel we'll send TalkBot messages to
const channel = '#general'

// Starts our server
app.listen(PORT, function() {
	console.log('TalkBot is listening on port ' + PORT);
});

// Handles incoming SMS to Twilio number
app.post('/sms', function(req, res) {
	// Gets message from Twilio req
	let msg = req.body.Body ? req.body.Body : '';
	// Gets phone number from sender without leading plus sign
	let num = req.body.From ? req.body.From.slice(1) : '';

	// Sends message to Slack - in format <msg> from <phone number>
	sendMessage(msg + ' from ' + num, channel, num);
});

function sendMessage(text, channel, num) {
	// Send message using Slack Web Client
	web.chat.postMessage(channel, text, function(err, info) {
		if (err) {
			console.log(err);
		}
	});
}