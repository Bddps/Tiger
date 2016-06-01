	
	module.exports.encoding = require('../HabboHotel/Encoding');
	module.exports.ServerMessage  = require('../HabboHotel/ServerMessage');
	module.exports.requests = require('../HabboHotel/Requests');

	module.exports.messages = {};
	module.exports.messages.incoming = require('../HabboHotel/Events/Incoming');
	module.exports.messages.outgoing = require('../HabboHotel/Events/Outgoing');