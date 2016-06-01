	
	var Database = require('mysql'),
		Tools = require('../Modules/Tools'),
		GP = require('generic-pool');

	module.exports = GP.Pool({

		name: "mysql",
		min: 2,
		max: 10,
		idleTimeoutMillis: 30000,

		create: function(callback){
			
			var Connection = Database.createConnection(Tools.settings.database);
				Connection.connect();
		
			return callback(null, Connection);
		},

		destroy: function(client){
			return client.end();
		}
	});