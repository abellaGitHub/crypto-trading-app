import { Meteor } from 'meteor/meteor';

import '../imports/exchanges/exchanges.js';  

Meteor.methods({
	'getCurrentDate': function() {
		var currentDate = new Date();

		function correctDateNumber(number) {
			if(number < 10) {
				return '0' + number;
			} else {
				return number.toString();
			}
		};

		currentDate = correctDateNumber(currentDate.getDate()) + "/"
	                + correctDateNumber(currentDate.getMonth() + 1)  + "/" 
	                + currentDate.getFullYear() + " @ "  
	                + correctDateNumber(currentDate.getHours()) + ":"  
	                + correctDateNumber(currentDate.getMinutes()) + ":" 
	                + correctDateNumber(currentDate.getSeconds());

        return currentDate;
	}
});