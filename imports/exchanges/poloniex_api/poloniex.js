import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

export const PoloniexData = new Mongo.Collection('poloniex');
/*
if(Meteor.isServer) {
	Meteor.setInterval(function() {
		HTTP.get('https://poloniex.com/public?command=returnTicker', function(error, response) {
			if(!error) {
				// console.log(response.data.USDT_BTC);
				PoloniexData.insert(response.data.USDT_BTC);
			} else {
				console.log(error);
			}
		});
	}, 5000);
}*/