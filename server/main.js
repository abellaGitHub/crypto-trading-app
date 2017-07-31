import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

import '../imports/exchanges/bitfinex_api/bitfinex.js';
import '../imports/exchanges/poloniex_api/poloniex.js';
import '../imports/exchanges/exchanges.js';  

Meteor.methods({
	'getCurrentDate': function() {
		var currentDate = new Date();

		currentDate = currentdate.getDate() + "/"
	                + (currentdate.getMonth()+1)  + "/" 
	                + currentdate.getFullYear() + " @ "  
	                + currentdate.getHours() + ":"  
	                + currentdate.getMinutes() + ":" 
	                + currentdate.getSeconds();

        return currentDate;
	}
});