import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

export const PoloniexData = new Mongo.Collection('poloniex');

if(Meteor.isServer) {
	Meteor.startup(function() {
		/*Meteor.setInterval(function() {
			HTTP.get('https://poloniex.com/public?command=returnTicker', function(error, response) {
				if(!error) {
					var usdBtcData = response.data.USDT_BTC;

					usdBtcData = {
						last: Meteor.call('round', usdBtcData.last, 3),
						mid: Meteor.call('round', (parseFloat(usdBtcData.highestBid) + parseFloat(usdBtcData.lowestAsk)) / 2, 3)
					}

					usdBtcData = {
						id: 'plx',
						usd_btc: usdBtcData,
						date: Meteor.call('getCurrentDate')
					}

					PoloniexData.insert(usdBtcData);
				} else {
					console.log('Poloniex');
					console.log(error);
				}
			});
		}, 5000);*/
	});
}