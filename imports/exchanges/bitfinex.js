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
	});
}