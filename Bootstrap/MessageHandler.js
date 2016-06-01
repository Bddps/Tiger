
	var Habbo = require('../Modules/Habbo'),
		Tools = require('../Modules/Tools');

	module.exports = MessageHandler = function(Socket)
	{
		self = this;

		this.Received = function(Message)
		{
			if(typeof Socket == 'undefined' || typeof Socket == 'null') return;

			BufferBytes = new Buffer(Message);

			if(BufferBytes[0] == 60)
			{
				return Socket.write("<?xml version=\"1.0\"?>\r\n" +
                "<!DOCTYPE cross-domain-policy SYSTEM \"/xml/dtds/cross-domain-policy.dtd\">\r\n" +
                "<cross-domain-policy>\r\n" +
                "<allow-access-from domain=\"*\" to-ports=\"1-31111\" />\r\n" +
                "</cross-domain-policy>\0");
			}

			else
			{
				Packets = Habbo.encoding.parser(BufferBytes.toString('binary'));

				for(var i in Packets)
				{
					var Packet = Packets[i];
						Packet = Packet.substr(4);

					Header = Habbo.encoding.DecodeInt16(Packet);

					Parser = Packet.substr(2);

					HabboEvents = new EventRequest(Socket, Parser);

					if(typeof HabboEvents.Request[Header] !== 'undefined')
					{
						console.PacketExist('Packet length ' + Packet.length + ' Header: ' + Header + ' Body: ' + Habbo.encoding.WritePacket(Packet), this)
						return eval(HabboEvents.Request[Header]);
					}

					else{
						console.NoPacketExist('Packet length ' + Packet.length + ' Header: ' + Header + ' Body: ' + Habbo.encoding.WritePacket(Packet), this)
					}
				}
			}
		}

		return this;
	}