import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

import WebSocket from 'ws';

export const BitfinexData = new Mongo.Collection('bitfinex');

if(Meteor.isServer) {
	Meteor.startup(function() {

		const wss = new WebSocket('wss://api.bitfinex.com/ws');

		wss.on('message', function(msg) {
			console.log('Message:')
			console.log(msg);
		});

		wss.on('open', function() {
			console.log('Connected to Bitfinex WebSocket');
		});

		/*wss.on('pong', function(msg) {
			console.log('Pong:')
			console.log(msg);
		});

		wss.on('open', function() {
			wss.send('message', {'event': 'ping'});
		});*/
		/*
		Meteor.setInterval(function() {
			HTTP.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(error, response) {
				if(!error) {
					var usdBtcData = response.data;

					usdBtcData = {
						last: Meteor.call('round', usdBtcData.last_price, 3),
						mid: Meteor.call('round', usdBtcData.mid, 3)
					}

					usdBtcData = {
						id: 'bfx',
						usd_btc: usdBtcData, 
						date: Meteor.call('getCurrentDate')
					}

					BitfinexData.insert(usdBtcData);
				} else {
					console.log('Bitfinex');
					console.log(error);
				}
			});
		}, 5000);
		*/
	});
}