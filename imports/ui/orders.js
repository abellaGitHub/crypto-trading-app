import { Meteor } from 'meteor/meteor';

import { OrdersList } from '../orders/orders.js';
import { Exchanges } from '../exchanges/exchanges.js';

import './orders.html';

Template.orders.helpers({
	'getOrdersList': function() {
		return OrdersList.find({}, {sort: {date: -1}});
	}
});

Template.addOrder.events({	
	'click .addOrderButton': function(event) {
		event.preventDefault();

		var order = {
			exchangeId: event.target.exchangeId,
			currencyPair: event.target.currencyPair,
			type: event.target.orderType
		};
		console.log('Add New Order');
		// OrdersList.insert(order);
	},
	'change .exchanges': function(event) {
		event.preventDefault();

		console.log(event.target.value);
	}
});

Template.addOrder.helpers({
	'getExchanges': function() {
		return Exchanges.find({}, {sort: {name: 1}});
	},
	'getCurrencyPairs': function() {
		return ['USD/BTC', 'BTC/ETH', 'BTC/LTC', 'BTC/XRP'];
	},
	'getTypes': function() {
		return ['BUY', 'SELL'];
	}
});