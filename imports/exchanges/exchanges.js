import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

export const ExchangesData = new Mongo.Collection('exdata');

Meteor.setInterval(function() {
	var btxResponse = HTTP.get("https://api.bitfinex.com/v1/pubticker/btcusd");
	var plxResponse = HTTP.get('https://poloniex.com/public?command=returnTicker');

	if(!btxResponse && !plxResponse) {
		var btxData = btxResponse.data;
		var plxData = plxResponse.data.USDT_BTC;

		ExchangesData.insert({
			plxLastPrice: plxData.last,
			plxAvgPrice: (plxData.lowestAsk + plxData.highestBid) / 2,
			btxLastPrice: btxData.last_price,
			btxAvgPrice: btxData.mid,
			date: Meteor.call('getCurrentDate')
		});
	}
}, 5000);