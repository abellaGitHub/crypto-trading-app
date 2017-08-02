import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

export const BittrexData = new Mongo.Collection('bittrex');

if(Meteor.isServer) {
	Meteor.startup(function() {
		Meteor.setInterval(function() {
			HTTP.get('https://bittrex.com/api/v1.1/public/getticker?market=usdt-btc', function(error, response) {
				if(!error) {
					var usdBtcData = response.data.result;

					usdBtcData = {
						last: Meteor.call('round', usdBtcData.Last, 3),
						mid: Meteor.call('round', (parseFloat(usdBtcData.Bid) + parseFloat(usdBtcData.Ask)) / 2, 3)
					}

					usdBtcData = {
						id: 'btx',
						usd_btc: usdBtcData,
						date: Meteor.call('getCurrentDate')
					}

					BittrexData.insert(usdBtcData);
				} else {
					console.log('Bittrex');
					console.log(error);
				}
			});
		}, 5000);
	});
}