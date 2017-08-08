import { Meteor } from 'meteor/meteor';

import { OrdersList } from '../orders/orders.js';
import { Exchanges } from '../exchanges/exchanges.js';

import './orders.html';

Template.orders.helpers({
	'getOrdersList': function() {
		return OrdersList.find({}, {sort: {date: -1}});
	}
});

Template.orders.events({	
	'addOrder': function(event) {
		event.preventDefault();

		var order = {
			exchangeId: event.target.exchangeId,
			currencyPair: event.target.currencyPair,
			type: event.target.orderType
		};

		// OrdersList.insert(order);
	}
});

Template.addOrder.helpers({
	'getExchanges': function() {
		return Exchanges.find({}, {sort: {name: 1}});
	},
	'getCurrencyPairs': function() {
		return ['USD/BTC'];
	},
	'getTypes': function() {
		return ['BUY', 'SELL'];
	}
});