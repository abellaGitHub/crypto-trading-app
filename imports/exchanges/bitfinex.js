import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

export const BitfinexData = new Mongo.Collection('bitfinex');

if(Meteor.isServer) {
	Meteor.startup(function() {
		Meteor.setInterval(function() {
			HTTP.get('https://api.bitfinex.com/v1/pubticker/btcusd', function(error, response) {
				if(!error) {
					var usdBtcData = response.data;

					usdBtcData = {
						last: usdBtcData.last_price,
						mid: usdBtcData.mid,
						date: Meteor.call('getCurrentDate')
					}

					usdBtcData = {
						usd_btc: usdBtcData
					}

					BitfinexData.insert(usdBtcData);
				} else {
					console.log('Bitfinex');
					console.log(error);
				}
			});
		}, 5000);
	});
}