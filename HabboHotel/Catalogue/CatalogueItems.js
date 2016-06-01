
	var HashMap = require('hashmap').HashMap;

	function CatalogueItem(dataRow)
	{
		this.ID = dataRow.id;
		this.pageID = dataRow.page_id;
		this.allItems = dataRow.items_ids;
		this.amountItems = new HashMap()
		this.subItems = Array();

		if(allItems.indexOf(";") > -1)
		{
			for(var i in allItems.split(";"))
			{
				Parse = allItems[i].split(',');
				this.ItemID = parseInt(Parse[0]);
				Amount = parseInt(Parse[1]);

				this.subItems.push(this.ItemID);
				this.amountItems.set(this.ItemID, Amount);
			}
		}
		else
		{
			for(var il in allItems.split(','))
			{
				if(allItems[il].trim().length < 1)
					continue;

				subItems.push(parseInt(allItems[il].trim()))
			}
		}

		this.name = dataRow.catalog_name;
		this.creditCost = dataRow.cost_credits;
		this.currencyCost = dataRow.cost_pixels;
		this.currencyType = dataRow.type_cost;
		this.amount = dataRow.amount;
		this.limitedStack = parseInt(dataRow.limited_stack);
		this.limitedSell = parseInt(dataRow.limited_sell);
		this.isLimited = (limitedStack > 0) ? true : false;
		
		offerActive = (dataRow.offer_active == "1") ? true : false;
		
		this.haveOffer = (isLimited ? false : (amount > 1 ? false : (name.indexOf("CF") > -1 ? false : (subItems.length > 1 ? false : offerActive))));
		this.extraData = dataRow.extradata;

		itemsBadge = dataRow.achievement;
		this.badges = Array();

		if(itemsBadge.indexOf(',') > -1)
		{
			b = itemsBadge.split(",");
			for(var i in b)
			{
				if(b[i].length <= 1)
					continue;

				this.badges.push(b[i]);
			}
		}

		else if (itemsBadge !== "")
			this.badges.push(itemsBadge);

		this.clubLevel = dataRow.club_level;
		this.predesignedID = dataRow.predesigned_id;
	}

	function getTypeCurrency(type)
	{
		switch(Type) 
		{
			case "fidelitypoints":
				return 5
			break;

			case "diamonds":
				return 101;
			break;

			case "peanuts":
				return 102;
			break;

			case "starts":
				return 103;
			break;

			case "clouds":
				return 104;
			break;

			case "pumpkins":
				return 105; 
			break;

			default:
				return 0;
			break;
		}
	}

	function Serialize(message)
	{
		message.WriteInt32(this.ID);
		message.WriteString(this.name);
		message.WriteBool(false);
		message.WriteInt32(this.creditCost);
		message.WriteInt32(this.currencyCost);
		message.WriteInt32((this.currencyCost > 0) ? this.currencyType : 0);
		message.WriteBool(true);
		message.WriteInt32(this.subItems.length + this.badges.length);

		for(var i in this.subItems)
		{
			item = getBaseItem(this.subItems(i));

			if(item == null)
				continue;

		    if(item.indexOf("avatar_effect") > -1)
		    {
		        message.WriteString("e");
		        message.WriteInt32(item.SpriteId);
		        message.WriteString(this.extraData);
		        message.WriteInt32(1);
		    }

		    else
		    {
		        message.WriteString(item.Type);
		        message.WriteInt32(item.SpriteId);
		       
		        if (this.name.indexOf("wallpaper_single") > -1 || this.name.indexOf("floor_single") > -1 || this.name.indexOf("landscape_single") > -1)
		        {
		            tmpArray = this.name.split("_");
		            message.WriteString(tmpArray[2]);
		        }

		        else if (name.contains("rentable_bot"))
		            message.WriteString(this.extraData);

		        else
		            message.WriteString("");

		        message.WriteInt32((this.amountItems.get(this.ItemID) != null ? this.amountItems.get(this.ItemID) : this.amount));
		    }

		    message.WriteBool(this.isLimited); // IsLimited

		    if (isLimited)
		    {
		        message.WriteInt32(this.limitedStack);
		        message.WriteInt32(this.limitedStack - this.limitedSell);
		    }
		}
		for (var i in this.badges)
		{
		    message.WriteString("b");
		    message.WriteString(this.badges[i]);
		}

		message.writeInt(this.clubLevel);
		message.WriteBool(this.haveOffer);
	}

	function pageID()
	{
		return this.pageID;
	}

	function itemID()
	{
		return this.ID;
	}

	CatalogueItem.prototype.pageID = pageID;
	CatalogueItem.prototype.itemID = itemID;
	CatalogueItem.prototype.serialize = Serialize;

	module.exports = CatalogueItem;