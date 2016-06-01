
	var Tools = require('../../Modules/Tools'),
		Events = require('../../Modules/Events'),
		Habbo = require('../../Modules/Habbo');

	module.exports = Navigator = function(Socket, Buffer)
	{
		this.EnableNavigator = function()
		{
			var NavigatorHeight = Object.create(Habbo.ServerMessage);
				NavigatorHeight.Header(Habbo.messages.outgoing.heightNavigatorNew);
				NavigatorHeight.WriteInt32(1); // x
				NavigatorHeight.WriteInt32(1); // y
				NavigatorHeight.WriteInt32(576); // width
				NavigatorHeight.WriteInt32(600); // height
				NavigatorHeight.WriteInt32(0);
				NavigatorHeight.WriteBool(false); // ??
			
			Socket.write(NavigatorHeight.get());

			var MetaNavigator = Object.create(Habbo.ServerMessage);
				MetaNavigator.Header(Habbo.messages.outgoing.navigatorData);
				MetaNavigator.WriteInt32(4);
				MetaNavigator.WriteString("official_view");
				MetaNavigator.WriteInt32(0);
				MetaNavigator.WriteString("hotel_view");
				MetaNavigator.WriteInt32(0);
				MetaNavigator.WriteString("roomads_view");
				MetaNavigator.WriteInt32(0);
				MetaNavigator.WriteString("myworld_view");
				MetaNavigator.WriteInt32(0);
				
			Socket.write(MetaNavigator.get());

			delete NavigatorHeight, MetaNavigator;
		}

		return this;
	}