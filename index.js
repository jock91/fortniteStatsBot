'use strict';

const TOKEN         = '545695522:AAHNtjFBIJMy8o7UTZ5Z00gLfMkw5MMSPfU';
const APIKEY 		= '45407305-e16a-400b-9ec7-8e062ee89332';
const TelegramBot   = require('node-telegram-bot-api');
const options = {
	polling: true
};
const bot = new TelegramBot(TOKEN, options);

var Client = require('node-rest-client').Client;
 
var client = new Client();
var args = {
    headers: { 'TRN-Api-Key': APIKEY }
};

bot.on('message', (msg) => {
	var command 	= msg.text.split(" "),
		cmd         = command[0],
		plateforme  = command[1],
		user        = command[2];


	console.log(command[0]);

	if( cmd == '!help' ) {
		var values = '<i style="color:red;">!ftn plateforme user</i>';
	    bot.sendMessage(msg.chat.id, values ,{parse_mode : "HTML"});
	}	
	if( cmd == '!ftn' ) {
		client.registerMethod("jsonMethod", "https://api.fortnitetracker.com/v1/profile/" + plateforme +"/" + user, "GET");

		client.methods.jsonMethod(args, function (data, response) {
		    var values = '<b>Score solo : </b>' + data.stats.p2.score.value + '\n<b>Nombre de victoire :</b> ' + data.stats.p2.top1.value;
		    bot.sendMessage(msg.chat.id, values ,{parse_mode : "HTML"});
		    //console.log(data.stats);
		});
	}	
});


