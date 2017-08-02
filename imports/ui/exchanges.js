import { Template } from 'meteor/templating';

import { Exchanges } from '../exchanges/exchanges.js';
import { BitfinexData } from '../exchanges/bitfinex.js';
import { PoloniexData } from '../exchanges/poloniex.js';
import { BittrexData } from '../exchanges/bittrex.js';

import './exchanges.html';

Template.exchanges.helpers({
	'data': function() {

		var exchangeDbMap = {
			bfx: BitfinexData,
			plx: PoloniexData,
			btx: BittrexData
		};

		var exchanges = Exchanges.find({}, {sort: {name: 1}}).fetch();

		for(var i = 0; i < exchanges.length; i++) {
			var exchange = exchanges[i];
			var exchangeDb = exchangeDbMap[exchange.id];

			var data = exchangeDb.find().fetch()[0]
	
			if(data === undefined) {
				continue;
			} 

			exchange.data = data.usd_btc;
			exchange.date = data.date;

			exchanges[i] = exchange;
		}

		return exchanges;
	}
});