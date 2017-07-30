import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { HTTP } from 'meteor/http';

import { BitfinexData } from '../exchanges/bitfinex_api/bitfinex.js';

import './body.html';

import socket_client from 'socket.io-client';

Meteor.startup(function() {
	const io = socket_client('http://localhost:80');

	io.on('hello', function(message) {
		console.log(message);
	});
});

Template.body.helpers({
	'data': function() {
		return BitfinexData.find({}, { sort: { time: -1 } });
	}
});

Template.body.events({
	'click .connectToSocket': function() {

	}
});