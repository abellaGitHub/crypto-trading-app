import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

import WebSocket  from 'ws';
import moment from 'moment';
import _ from 'lodash';

export const BitfinexData = new Mongo.Collection('bitfinex');

if(Meteor.isServer) {
	const API_KEY = 'NKtwF11HFwYSfTcUNYaYI89EK0AWgWLSnUn7YAnFWtP';
	const API_SECRET = 'fWGw1cNKvQ5xRV8xto8JQviOoD0CMeijKWJk1gcNWxU';
	const ws = new WebSocket('wss://api.bitfinex.com/ws/2');

	var channels = [];

	Meteor.startup(function() {
		ws.on('open', () => {
			console.log('Connection opened ...');
			var subscribe = {
				event: 'subscribe',
				channel: 'candles',
				key: 'trade:1h:tBTCUSD'
			};
			ws.send(JSON.stringify(subscribe));
		});

		ws.on('message', (msg) => {
			msg = JSON.parse(msg);
			if(msg.event === 'pong') {
				console.log(moment().format('HH:mm:ss DD/MM/YYYY'), 'PING: success');
			} else if(msg.event === 'info') {
				if(msg.version !== undefined) {
					console.log(moment().format('HH:mm:ss DD/MM/YYYY'), 'INFO:', 'version:', msg.version);
				} else if(msg.code !== undefined) {
					console.log(moment().format('HH:mm:ss DD/MM/YYYY'), 'INFO:', 'code:', msg.code, 'msg:', msg.msg);
				}
			} else if(msg.event === 'error') {
				console.log(moment().format('HH:mm:ss DD/MM/YYYY'), 'ERROR:', 'code:', msg.code, 'msg:', msg.msg);
			} else if(msg.event === 'subscribed') {
				if(msg.channel === 'ticker') {
					channels.push({channel: msg.channel, pair: msg.pair, chanId: msg.chanId});
					console.log(moment().format('HH:mm:ss DD/MM/YYYY'), 'SUBSCRIBED:', 'pair:', msg.pair, 'channel:', msg.channel, 'channelId:', msg.chanId);
				} else if(msg.channel === 'candles') {
					channels.push({channel: msg.channel, key: msg.key, chanId: msg.chanId});
					console.log(moment().format('HH:mm:ss DD/MM/YYYY'), 'SUBSCRIBED:', 'key:', msg.key, 'channel:', msg.channel, 'channelId:', msg.chanId);
				}
			} else if(msg.event === 'unsubscribed') {
				var unsubCh = _.remove(channels, (channel) => { return channel.chanId === msg.chanId});
				if(unsubCh.length > 0) {
					unsubCh = unsubCh[0];
					console.log(moment().format('HH:mm:ss DD/MM/YYYY'), 'UNSUBSCRIBED:', 'pair:', unsubCh.pair, 'channel:', unsubCh.channel, 'channelId:', unsubCh.chanId);
				}
			} else {
				console.log(msg);
			}
		}); 

		Meteor.setInterval(() => {
			ws.send(JSON.stringify({event: 'ping'}));
		}, 60000);
	});
}