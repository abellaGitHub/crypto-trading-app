import { Meteor } from 'meteor/meteor';

import moment from 'moment';

import '../imports/exchanges/exchanges.js';
import '../imports/exchanges/bitfinex.js';
import '../imports/exchanges/poloniex.js'; 
import '../imports/exchanges/bittrex.js';

Meteor.methods({
	'getCurrentDate': function() {
        return moment().format('DD/MM/YYYY HH:mm:ss');
	},
	'round': function(number, place) {
		var x = Math.pow(10, place);
		return Math.round(number * x) / x;
	}
});