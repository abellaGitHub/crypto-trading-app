import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

export const UsdBtcData = new Mongo.Collection('usdbtc');

if(Meteor.isServer) {
	Meteor.setInterval(function() {

		try {
			var bitfinexUsdBtc = HTTP.get('https://api.bitfinex.com/v1/pubticker/btcusd');
			var poloniexAll = HTTP.get('https://poloniex.com/public?command=returnTicker');
			var bittrexUsdBtc = HTTP.get('https://bittrex.com/api/v1.1/public/getticker?market=usdt-btc');
		} catch(error) {
			console.log('Error: ' + error.name + ', Message: ' + error.message);
		}


		if(bitfinexUsdBtc && poloniexAll && bittrexUsdBtc) {
			var bitfinexUsdBtcData = bitfinexUsdBtc.data;
			var poloniexUsdBtcData = poloniexAll.data.USDT_BTC;
			var bittrexUsdBtcData = bittrexUsdBtc.data.result;

			var usdBtcData = {
				bitfinex:  {
					last: Meteor.call('round', bitfinexUsdBtcData.last_price, 3),
					mid: Meteor.call('round', bitfinexUsdBtcData.mid, 3)
				},
				poloniex: {
					last: Meteor.call('round', poloniexUsdBtcData.last, 3),
					mid: Meteor.call('round', (parseFloat(poloniexUsdBtcData.highestBid) + parseFloat(poloniexUsdBtcData.lowestAsk)) / 2, 3)
				},
				bittrex: {
					last: Meteor.call('round', bittrexUsdBtcData.Last, 3),
					mid: Meteor.call('round', (parseFloat(bittrexUsdBtcData.Ask) + parseFloat(bittrexUsdBtcData.Bid)) / 2, 3)
				},
				timestamp: Date.now(),
				date: Meteor.call('getCurrentDate')
			}

			UsdBtcData.insert(usdBtcData);  
		}
	}, 5000);
}