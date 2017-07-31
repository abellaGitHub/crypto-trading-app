import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

export const UsdBtcData = new Mongo.Collection('usdbtc');

if(Meteor.isServer) {
	Meteor.setInterval(function() {
		var bitfinexUsdBtc = HTTP.get("https://api.bitfinex.com/v1/pubticker/btcusd");
		var poloniexAll = HTTP.get('https://poloniex.com/public?command=returnTicker');
		var bittrexUsdBtc = HTTP.get('https://bittrex.com/api/v1.1/public/getticker?market=usdt-btc');

		if(bitfinexUsdBtc && poloniexAll && bittrexUsdBtc) {
			var bitfinexUsdBtcData = bitfinexUsdBtc.data;
			var poloniexUsdBtcData = poloniexAll.data.USDT_BTC;
			var bittrexUsdBtcData = bittrexUsdBtc.data.result;

			var usdBtcData = {
				bitfinex:  {
					last: round(bitfinexUsdBtcData.last_price, 3),
					mid: round(bitfinexUsdBtcData.mid, 3)
				},
				poloniex: {
					last: round(poloniexUsdBtcData.last, 3),
					mid: round((parseFloat(poloniexUsdBtcData.highestBid) + parseFloat(poloniexUsdBtcData.lowestAsk)) / 2, 3)
				},
				bittrex: {
					last: round(bittrexUsdBtcData.Last, 3),
					mid: round((parseFloat(bittrexUsdBtcData.Ask) + parseFloat(bittrexUsdBtcData.Bid)) / 2, 3)
				},
				timestamp: Date.now(),
				date: new Date()
			}

			UsdBtcData.insert(usdBtcData);
		}
	}, 5000);

	var round = function(number, place) {
		var x = Math.pow(10, place);
		return Math.round(number * x) / x;
	}
}