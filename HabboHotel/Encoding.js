		
	// Thanks to @Burak on Darkbox
	
	module.exports = HabboProtocol = {

		DecodeInt16: function(str)
		{
			str = str.split('');

			if(str.length < 2) 
				return -1;

			if( (str[0].charCodeAt(0) | str[1].charCodeAt(0)) < 0) 
				return -1;

			return ((str[0].charCodeAt(0) << 8)+(str[1].charCodeAt(0) << 0));
		},

		DecodeInt32: function(str)
		{
			str = str.split('');

			if(str.length < 4) 
				return -1;

			if((str[0].charCodeAt(0) | str[1].charCodeAt(0) | str[2].charCodeAt(0) | str[3].charCodeAt(0)) < 0)
				return -1;
			
			return ((str[0].charCodeAt(0) << 24)+(str[1].charCodeAt(0) << 16)+(str[2].charCodeAt(0) << 8)+(str[3].charCodeAt(0) << 0));
		},
		
		EncodeInt16: function(number)
		{
			var str = [];
			str[0] = String.fromCharCode((number >> 8) & 0xFF);
			str[1] = String.fromCharCode(number & 0xFF);
			return str.join('');
		},
		
		EncodeInt32: function(number){
			var str = [];
			str[0] = String.fromCharCode((number >> 24) & 0xFF);
			str[1] = String.fromCharCode((number >> 16) & 0xFF);
			str[2] = String.fromCharCode((number >> 8) & 0xFF);
			str[3] = String.fromCharCode(number & 0xFF);
			return str.join('');
		},

		EncodeString: function(str){
			return this.EncodeInt16(str.length)+str
		},

		readString: function(buffer)
		{
			leng = this.DecodeInt16(buffer)
			result = buffer.substr(2, leng)

			return result;
		},
		
		parser: function(buffer)
		{
			var packetlist = [];
			var count = 0;
			var max = 50;

			while(buffer.length > 3){

				if (count++ >= max) {	
					return;
				}

				var split = buffer.split('');
				var lenth = this.DecodeInt32(split[0]+split[1]+split[2]+split[3])+4;

				packetlist.push(buffer.substr(0,lenth));
				buffer = buffer.substr(lenth);
			}

			return packetlist;
		},

		WritePacket: function(buffer)
		{
			for(i = 0; i < 15; i++){
				buffer = buffer.replace(String.fromCharCode(i), "["+ i +"]") 
			}

			return buffer
		}
	};