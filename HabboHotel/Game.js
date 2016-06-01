	
	var Events = require('../Modules/Events'),
		Habbo = require('../Modules/Habbo'),
		Tools = require('../Modules/Tools');

	module.exports = Game = function()
	{	
		this.Loaded = false;

		this.Initialize = function()
		{
			Catalogue = new Events.Catalogue();
			//Catalogue.Initialize();

			this.Loaded = true;
		}
	}