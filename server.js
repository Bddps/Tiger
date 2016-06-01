
	var Tools = require('./Modules/Tools'),
		Bootstrap = require('./Bootstrap');
		Game = require('./HabboHotel/Game');

	var GameHandler = new Game();
		GameHandler.Initialize();

	BootstrapBind = setInterval(function(){

		if(GameHandler.Loaded)
		{
			clearInterval(BootstrapBind);

			new BootstrapListen().bind(Tools.settings.bootstrap.port, function(){
				console.ImportantMessage('Bootstrap started on port: ' + Tools.settings.bootstrap.port);
			});
		}

	}, 500);