import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

export const BitfinexData = new Mongo.Collection('bitfinex');

const publicUrl = "https://api.bitfinex.com/v1";