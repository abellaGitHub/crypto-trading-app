import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

export const BitfinexData = new Mongo.Collection('bitfinex');

const publicUrl = "https://api.bitfinex.com/v1";
/*
if(Meteor.isServer) {
	Meteor.setInterval(function() {
		HTTP.get("https://api.bitfinex.com/v1/pubticker/btcusd", function(error, result) {
			if(!error) {
				BitfinexData.insert(result.data);
			} else {
				console.log(error);
			}
		});
	}, 5000);
};*/