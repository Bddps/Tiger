	
	var Tools = require('../../Modules/Tools'),
		Events = require('../../Modules/Events'),
		Habbo = require('../../Modules/Habbo');

	module.exports = GameClient = function(Socket, Buffer)
	{
		this.parseCampaing = function()
		{
			Data = Habbo.encoding.readString(Buffer);

			var SendCampaing = Object.create(Habbo.ServerMessage);
				SendCampaing.Header(Habbo.messages.outgoing.parseCampaings);
				SendCampaing.WriteString("");
				SendCampaing.WriteString("");
				
			Socket.write(SendCampaing.get());
		}

		this.PromosParser = function()
		{
			var Promos = Object.create(Habbo.ServerMessage);
				Promos.Header(Habbo.messages.outgoing.sendPromos);
				Promos.WriteInt32(1);
				Promos.WriteInt32(1);
				Promos.WriteString('¡Bienvenido ' + Socket.HabboUser.username + '!');
				Promos.WriteString('Dimelo tú cuando salgas sola que yo te llego sin demora \nAmi me encanta pero cuando sales sola, no con amigas por que así te descontrolas');
				Promos.WriteString('Una noche más');
				Promos.WriteInt32(2);
				Promos.WriteString('client_linkcatalog/warehouse/oldhween14');
				Promos.WriteString('catalogue/guild_forums_teaser.gif');

			Socket.write(Promos.get());
		}

		return this;
	}