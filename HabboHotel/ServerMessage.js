	
	var Habbo = require('../Modules/Habbo'),
		Tools = require('../Modules/Tools');

	module.exports = ServerMessage = {

		Header: function(header)
		{
			if(typeof header == "number"){
				this.header = header;
				this.packet = Habbo.encoding.EncodeInt16(header);
				return true;
			}

			else{
				return false;
			}
		},

		WriteInt16: function(integer)
		{
			if(typeof integer == "number"){
				this.packet += Habbo.encoding.EncodeInt16(integer);
				return true;
			}

			else{
				return false;
			}
		},

		WriteInt32: function(integer)
		{
			if(typeof integer == "number"){
				this.packet += Habbo.encoding.EncodeInt32(integer);
				return true;
			}

			else{
				return false;
			}
		},

		WriteString: function(str)
		{
			this.packet += Habbo.encoding.EncodeString(str);
			return true;
		},

		WriteBool: function(bool)
		{
			this.packet += String.fromCharCode(bool);
			return true;
		},

		get: function()
		{
			this.packet = Habbo.encoding.EncodeInt32(this.packet.length) + this.packet;

			DebuggerBuffer = new Buffer(this.packet).toString('binary');
			BufferParser = Habbo.encoding.parser(DebuggerBuffer)

			for(var i in BufferParser)
				console.PacketSend('HEADER: ' + this.header + ' LENGTH: ' + this.packet.length + ' BODY: ' + Habbo.encoding.WritePacket(BufferParser[i]), this);

			
			return new Buffer(this.packet, "binary");
		}
	}