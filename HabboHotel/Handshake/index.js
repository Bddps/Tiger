	
	var Tools = require('../../Modules/Tools'),
		Events = require('../../Modules/Events'),
		Habbo = require('../../Modules/Habbo');

	module.exports = HandshakeEvent = function(Socket, Buffer)
	{
		self = this;

		this.HabboUser = new Events.HabboUser(Socket, Buffer);

		this.getReleaseEvent = function(){}

		this.InitCryptoMessageEvent = function(){

			Message = Object.create(Habbo.ServerMessage)

			Message.Header(Habbo.messages.outgoing.sendBannerData);
			Message.WriteString("43B2E306BA5673A7D761FC703FCC6662FE29E14DE267F82CB900E429B09EA1684D88ECF35DC6E50DC5CECA19976A78715F74503A883CA65CFD70361060A2A38E2CE9248091EA17C37AA60C32605FDFD4B9D1D0D4E17D3285A850D70D572A03B0D75DF0EE38B7AE30CA2EA9226D173144BA141311B733D0807F052CFC807292A0"); //clientCrypto.GetSignedPrimeKey());
			Message.WriteString("152D0E73C0D30E5D1203BBA4AD37B5F9324995E8E37758F1614DCC12E518AB56550711B824BCF644F16D4BDFBDED38E674A5DB74DBDBED0801F4323F50AA39DF862B943175DD18E17D180DE4D5E5FCB87B998E48391EE1790F6723DFC64D33839B8181B3E626EA7D3D706F44C9E5CE5BA717C6775CE31CAF743BABCEBCCF0915"); //clientCrypto.GetSignedGeneratorKey());
		
			Socket.write(Message.get())
		}

		this.sendSecretKey = function()
		{
			Message = Object.create(Habbo.ServerMessage)

			Message.Header(Habbo.messages.outgoing.sendMessageComposer)
			
			Message.WriteString("35979FED732B2799C14CED394EAB267507EEF673E7EFCF65260C171F7DC5D258EA6A2BD20C3F195BE6CBEEA79EEC4DB00CBBD3ABF7874DC496994FBDEFC86604C3C8386B91205FA844E4802ADF84AF607A72DF3EC92D60413EDA9CDD50D47C5BC58E4FDBDE6CFB74A5EB10C998CAE5A019988F5745F3699B278F3A61A592EF19"); //clientCrypto.GetSignedPublicKey());
            Message.WriteBool(false)

            Socket.write(Message.get())
		}

		this.clientVars = function(){}

		this.uniqueMachine = function()
		{
			var MachineId = Habbo.encoding.readString(Buffer);

			if(MachineId.length < 0)
			{
				MachineId = Tools.rands.giveRand(32);

				var Fingerprint = Object.create(Habbo.ServerMessage);
				Fingerprint.Header(Habbo.messages.outgoing.sendMachineID);
				Fingerprint.WriteString(MachineId);

				Socket.write(Fingerprint.get());
			}

			Socket.MachineId = MachineId;
		}

		this.tryLogin = function()
		{
			self.HabboUser.tryLogin(Habbo.encoding.readString(Buffer), function(exist){
				
				if(exist)
				{
					if(typeof Socket.HabboUser == 'undefined') return Socket.destroy();

					var Authentication = Object.create(Habbo.ServerMessage);
						Authentication.Header(Habbo.messages.outgoing.sendAuthentication);
					
					Socket.write(Authentication.get());

					var InitialRoom = Object.create(Habbo.ServerMessage);
						InitialRoom.Header(Habbo.messages.outgoing.HomeRoomMessageComposer);
						InitialRoom.WriteInt32(0);
						InitialRoom.WriteInt32(0);

					Socket.write(InitialRoom.get());

					var FavoriteRooms = Object.create(Habbo.ServerMessage);
						FavoriteRooms.Header(Habbo.messages.outgoing.sendFavoriteRooms);
						FavoriteRooms.WriteInt32(30); // Max room favorites
						FavoriteRooms.WriteInt32(0); // Length user rooms favorites

					Socket.write(FavoriteRooms.get()); // Make for of favorites rooms

					var HabboClub = Object.create(Habbo.ServerMessage);
						HabboClub.Header(Habbo.messages.outgoing.serializeClub);
						HabboClub.WriteString("club_habbo");
						HabboClub.WriteInt32(0);
						HabboClub.WriteInt32(0);
						HabboClub.WriteInt32(0);
						HabboClub.WriteInt32(0);
						HabboClub.WriteBool(true);
						HabboClub.WriteBool(true);
						HabboClub.WriteInt32(0);
						HabboClub.WriteInt32(0);
						HabboClub.WriteInt32(495);

					Socket.write(HabboClub.get());

					var Fuserights = Object.create(Habbo.ServerMessage);
						Fuserights.Header(Habbo.messages.outgoing.fuseRights);
						Fuserights.WriteInt32(2);
						Fuserights.WriteInt32(5);
						Fuserights.WriteBool(true);

					Socket.write(Fuserights.get());

					Socket.write(self.HabboUser.updateExtraBalance());
					Socket.write(self.HabboUser.updateMoneyBalance());

					var HabboProfile = Object.create(Habbo.ServerMessage)
						HabboProfile.Header(Habbo.messages.outgoing.HabboProfileInfo);
						HabboProfile.WriteInt32(Socket.HabboUser.id);
						HabboProfile.WriteString(Socket.HabboUser.username);
						HabboProfile.WriteString(Socket.HabboUser.look);
						HabboProfile.WriteString(Socket.HabboUser.gender.toUpperCase());
						HabboProfile.WriteString(Socket.HabboUser.motto);
						HabboProfile.WriteString('Tiger Emulator');
						HabboProfile.WriteBool(false); 
						HabboProfile.WriteInt32(3);
						HabboProfile.WriteInt32(3);
						HabboProfile.WriteInt32(3);
						HabboProfile.WriteBool(true);
						HabboProfile.WriteString(Socket.HabboUser.last_online);
						HabboProfile.WriteBool(false);
						HabboProfile.WriteBool(false);

					Socket.write(HabboProfile.get());

					var ClientInterface = Object.create(Habbo.ServerMessage);
						ClientInterface.Header(Habbo.messages.outgoing.ClientInterface);
						ClientInterface.WriteInt32(13);
						ClientInterface.WriteString("NEW_UI");
						ClientInterface.WriteString("");
						ClientInterface.WriteBool(true);
						ClientInterface.WriteString("TRADE");
						ClientInterface.WriteString("requirement.unfulfilled.citizenship_level_3");
						ClientInterface.WriteBool(true);
						ClientInterface.WriteString("CAMERA");
						ClientInterface.WriteString("");
						ClientInterface.WriteBool(true);
						ClientInterface.WriteString("EXPERIMENTAL_CHAT_BETA");
						ClientInterface.WriteString("");
						ClientInterface.WriteBool(true);
						ClientInterface.WriteString("CITIZEN");
						ClientInterface.WriteString("");
						ClientInterface.WriteBool(true);
						ClientInterface.WriteString("NAVIGATOR_PHASE_ONE_2014");
						ClientInterface.WriteString("");
						ClientInterface.WriteBool(false);
						ClientInterface.WriteString("USE_GUIDE_TOOL");
						ClientInterface.WriteString("");
						ClientInterface.WriteBool(true);
						ClientInterface.WriteString("BUILDER_AT_WORK");
						ClientInterface.WriteString("");
						ClientInterface.WriteBool(false);
						ClientInterface.WriteString("JUDGE_CHAT_REVIEWS");
						ClientInterface.WriteString("");
						ClientInterface.WriteBool(true);
						ClientInterface.WriteString("NAVIGATOR_PHASE_TWO_2014");
						ClientInterface.WriteString("");
						ClientInterface.WriteBool(true);
						ClientInterface.WriteString("CALL_ON_HELPERS");
						ClientInterface.WriteString("");
						ClientInterface.WriteBool(true);
						ClientInterface.WriteString("VOTE_IN_COMPETITIONS");
						ClientInterface.WriteString("");
						ClientInterface.WriteBool(false);
						ClientInterface.WriteString("EXPERIMENTAL_TOOLBAR");
						ClientInterface.WriteString("");
						ClientInterface.WriteBool(true);
					
					Socket.write(ClientInterface.get());

					delete Authentication, InitialRoom, FavoriteRooms, HabboClub, Fuserights, HabboProfile, ClientInterface;
				}

				else
				{
					Message = Object.create(Habbo.ServerMessage);
					Message.Header(Habbo.messages.outgoing.connectionLoginError);
					Message.WriteInt32(-3);
					Socket.write(Message.get());
				}

			});
		}

		return this;
	}