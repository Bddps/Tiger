	
	var Habbo = require('../Modules/Habbo');
		Events = require('../Modules/Events');

	module.exports = EventRequest = function(Socket, Buffer)
	{
		Handshake = new Events.Handshake(Socket, Buffer);
		Navigator = new Events.Navigator(Socket, Buffer);
		Interface = new Events.Client(Socket, Buffer);

		this.Request = {};
		this.Request[Habbo.messages.incoming.GetRelaseVersion] = "Handshake.getReleaseEvent()";
		this.Request[Habbo.messages.incoming.InitCryptoMessageEvent] = "Handshake.InitCryptoMessageEvent()";
		this.Request[Habbo.messages.incoming.SecretKey]  = "Handshake.sendSecretKey()";
		this.Request[Habbo.messages.incoming.clientVars] = "Handshake.clientVars()";
		this.Request[Habbo.messages.incoming.machineID]  = "Handshake.uniqueMachine()";
		this.Request[Habbo.messages.incoming.SSOTicket]  = "Handshake.tryLogin()";

		this.Request[Habbo.messages.incoming.Promos] = "Interface.PromosParser()";
		this.Request[Habbo.messages.incoming.CampaingParser] = "Interface.parseCampaing()";

		this.Request[Habbo.messages.incoming.NavigatorNew] = "Navigator.EnableNavigator()";
		
		return this;
	}