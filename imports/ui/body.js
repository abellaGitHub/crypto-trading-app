import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { UsdBtcData } from '../exchanges/exchanges.js';

import './body.html';

Template.body.helpers({
	'data': function() {

		var data = {
			exchanges: [],
			pairs: []
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

		for(var i = 0; i < exchangesTab.length; i++) {
			var exchangeSale = exchangesTab[i];
			
			if(exchangeSale.isActive && exchangeSale.canShortSale) {
				var exchangeSaleData = usdBtcData[exchange.name];

				for(var j; j < exchangesTab.length; i++) {
					var exchangeBuy = exchangesTab[j];

					if(exchangeBuy.isActive && (exchangeBuy.name !== exchangeSale.name)) {

					}
				}
			}
		}

		return UsdBtcData.find({}, {sort:{timestamp: -1}});
	}
});

Template.body.events({
	'click .connectToSocket': function() {

	}
});