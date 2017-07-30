import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

import socket_io from 'socket.io';

Meteor.startup(() => {
	const io = socket_io(80);

	io.on('connection', function(socket) {

	});

	Meteor.setInterval(function() {
		HTTP.get("https://api.bitfinex.com/v1/pubticker/btcusd", function(error, result) {
			if(!error) {
				io.emit('hello', result.data);
			} else {
				console.log(error);
			}
		});
	}, 5000);
});

/*
Meteor.setInterval(function() {
	HTTP.get("https://api.bitfinex.com/v1/pubticker/btcusd", function(error, result) {
		if(!error) {
			console.log(result.data);
		} else {
			console.log(error);
		}
	});
}, 5000);
*/