
	var net = require('net'),
		Tools = require('../Modules/Tools');

	module.exports = BootstrapListen = function()
	{
		this.bind = function(port, callback)
		{
			var callback = (typeof callback == 'undefined') ? function() { } : callback;

			Thread = new net.Server({'allowHalfOpen': true, 'type': 'tcp4'});

			Thread.on('connection', function(Socket){

				Socket.setNoDelay(true);
				Socket.setKeepAlive(true);

				MessageHandler = require('./MessageHandler')(Socket);

				//console.ImportantMessage('New connection: ' + Socket.remoteAddress, this);

				Socket.on('data', function(buffer){
					return MessageHandler.Received(buffer);
				});

				Socket.on('end', function(){
					if(typeof Socket.HabboUser != 'undefined'){
						console.ImportantMessage(Socket.HabboUser.username + ' se ha desconectado...');
					}
				})
			});
			
			Thread.listen(port, callback);
		}

		return this;
	}