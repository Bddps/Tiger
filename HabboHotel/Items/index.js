	
	var HashMap = require('hashmap').HashMap; 
        InteractionType = require()

	function Item(Result)
    {
        this.Id = Result.item_id;
        this.SpriteId = Result.sprite_id;
        this.PublicName = Result.public_name;
        this.Name = Result.item_name;
        this.Type = Result.type.charAt(0);
        this.Width = Result.width;
        this.Length = Result.['length'];
        this.Height = Result.height;
        this.Stackable = (Result.allow_stack == 1) ? true : false;
        this.Walkable = (Result.allow_walk == 1) ? true : false;
        this.IsSeat = (Result.allow_sit == 1) ? true : false;
        this.AllowRecycle = (Result.allow_recycle == 1) ? true : false;
        this.AllowTrade = (Result.allow_trade == 1) ? true : false;
        this.AllowMarketplaceSell = (Result.allow_marketplace_sell == 1) ? true : false;
        this.AllowGift =  (Result.allow_gift == 1) ? true : false;
        this.AllowInventoryStack = (Result.allow_inventory_stack == 1) ? true : false;
        this.InteractionType = 2;
        this.Modes = Result.cycle_count;
        
        Bebidas = Result.vending_ids;

        this.VendingIds = Array();

        if (Bebidas.indexOf(",") >= -1)
        {
            for (var i in Bebidas.split(","))
            {
                this.VendingIds.push(parseInt(Bebidas[i].trim()));
            }
        }

        else if (Bebidas != "" && (parseInt(Bebidas.trim()) > 0)
        {
            this.VendingIds.push(parseInt(Bebidas.trim()));
        }

        this.StackMultiplier = (Result.height_adjustable) == "1") ? true : false;

        if(this.StackMultiplier)
        {
            this.MultiplierHeight = new HashMap();
        }

        this.effectID = Result.effectid;

        return this;
    }

    module.exports = Item;
