
	var Tools = require('../../Modules/Tools'),
		Habbo = require('../../Modules/Habbo');

	module.exports = Users = function(Socket, Buffer)
	{
		this.Init = function()
		{
			External = Socket.HabboUser;

			External.currentRoom = null;
		}

		this.tryLogin = function(ssoTicket, callback)
		{
			Tools.mysql.acquire(function(err, client){

				var queryAdd = (Tools.settings.game.ssoLogin) ? ' WHERE auth_ticket = ' + client.escape(ssoTicket) + '' : ' WHERE ip_reg = ' + Socket.remoteAddress + ' '; 
				
				client.query('SELECT * FROM users ' + queryAdd, function(err, rows){

					if(err) throw console.log(err)

					if(rows.length < 1)
					{
						return callback(false);
					}

					else
					{
						Socket.HabboUser = rows[0];
						return callback(true);
					}
				})

				Tools.mysql.release(client);
			});
		}

		this.updateMoneyBalance = function()
		{
			var MoneyBalance = Object.create(Habbo.ServerMessage);
				MoneyBalance.Header(Habbo.messages.outgoing.MoneyBalance);
				MoneyBalance.WriteString(Socket.HabboUser.credits + ".0");

			return MoneyBalance.get();
		}

		this.updateExtraBalance = function()
		{
			var BalanceExtra = Object.create(Habbo.ServerMessage);
				BalanceExtra.Header(Habbo.messages.outgoing.ExtraBalance);
				BalanceExtra.WriteInt32(3); // Objects
				BalanceExtra.WriteInt32(0); // 
				BalanceExtra.WriteInt32(Socket.HabboUser.activity_points);
				BalanceExtra.WriteInt32(5);
				BalanceExtra.WriteInt32(Socket.HabboUser.diamonds); 
				BalanceExtra.WriteInt32(105);
				BalanceExtra.WriteInt32(Socket.HabboUser.diamonds); 
			
			return BalanceExtra.get();
		}
		
		this.sendNotification = function(SocketManager, description)
		{
			var Notif = Object.create(Habbo.ServerMessage);
				Notif.Header(Habbo.messages.outgoing.SuperNotificationMessage);
				Notif.WriteString(description);
				Notif.WriteString("");

			return SocketManager.write(Notif.get())
		}
	}