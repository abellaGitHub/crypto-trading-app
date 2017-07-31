import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BitfinexData } from '../exchanges/bitfinex_api/bitfinex.js';
import { PoloniexData } from '../exchanges/poloniex_api/poloniex.js';
import { ExchangesData } from '../exchanges/exchanges.js';

import './body.html';

Template.body.helpers({
	'data': function() {
		return ExchangesData.find({});
	}
});

Template.body.events({
	'click .connectToSocket': function() {

	}
});