import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './body.html';

import './exchanges.js';

Template.body.helpers({

});

Template.body.events({

});

/*
Template.exchangesData.helpers({
	'data': function() {

		function round(number, place) {
			var x = Math.pow(10, place);
			return Math.round(number * x) / x;
		}

		var data = {
			exchanges: [],
			pairs: [],
			date: ''
		};

		var exchangesTab = [
			{
				name: 'bitfinex',
				canShortSale: true,
				isActive: true
			},
			{
				name: 'poloniex',
				canShortSale: true,
				isActive: true
			},
			{
				name: 'bittrex',
				canShortSale: false,
				isActive: true
			}
		];

		var usdBtcData = UsdBtcData.find({}, {sort:{timestamp: -1}}).fetch()[0];
		if(usdBtcData !== undefined) {
			data.date = usdBtcData.date;
			for(var i = 0; i < exchangesTab.length; i++) {
				var exchangeSale = exchangesTab[i];
				var exchangeSaleData = usdBtcData[exchangeSale.name];

				if(exchangeSale.isActive && exchangeSale.canShortSale) {				
					for(var j = 0; j < exchangesTab.length; j++) {
						var exchangeBuy = exchangesTab[j];

						if(exchangeBuy.isActive && (exchangeBuy.name !== exchangeSale.name)) {
							var exchangeBuyData = usdBtcData[exchangeBuy.name];

							var pair = {
								sale: exchangeSale.name,
								buy: exchangeBuy.name,
								spread: round(((exchangeSaleData.last - exchangeBuyData.last) / exchangeBuyData.last) * 100, 3)
							}
							
							data.pairs.push(pair);
						} 
					}
				}

				var exchange = {
					name: exchangeSale.name,
					last: exchangeSaleData.last,
					mid: exchangeSaleData.mid
				}

				data.exchanges.push(exchange);
			}
			
		} else {
			console.log('USD-BTC undefined');
		}

		return data;
	}
});
*/