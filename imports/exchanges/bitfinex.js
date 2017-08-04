import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

import WebSocket from 'ws';

export const BitfinexData = new Mongo.Collection('bitfinex');

if(Meteor.isServer) {
	Meteor.startup(function() {

		const wss = new WebSocket('wss://api.bitfinex.com/ws/2');

		Meteor.wrapAsync(wss.on('message', function(msg) {
			var res = JSON.parse(msg);
	
			if(res.toString() === '[object Object]') {
				if(res.event === 'subscribed') {
					console.log(res);
				} else if(res.event === 'info') {
					console.log(res);
				}
			} else {
				var dataArray = res[1];

				if(typeof dataArray !== 'string') {
					var bid = dataArray[0];
					var ask = dataArray[2];
					var last = dataArray[6];
					var mid = (bid + ask) / 2;

					console.log('Last:', last, 'Bid:', bid, 'Ask:', ask, 'Mid:', mid);
				} else {
					console.log('It is just a heartbeat ...');
				}
			}
		}));
 
		wss.on('open', function() {
			console.log('Connected to Bitfinex WebSocket');
			// wss.send(JSON.stringify({event: 'ping'}));

			let subReq = {
				event: 'subscribe',
				channel: 'ticker',
				symbol: 'tBTCUSD'
			};

			wss.send(JSON.stringify(subReq));
		});

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