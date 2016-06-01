	
	var Tools = require('../../Modules/Tools'),
		Habbo = require('../../Modules/Habbo');
		HashMap = require('hashmap').HashMap;

		CatalogItem = require('./CatalogueItems');
		CatalogPage = require('./CataloguePages');

	MAX_RANKS = 15;

	module.exports = Catalogue = function()
	{
		global.CataloguePages = new HashMap();
		global.CatalogueItems = new HashMap();
		
		this.Initialize = function()
		{	
			ItemsLoaded = false;
			PagesLoaded = false;

			for(var i = 1; i < MAX_RANKS; i++)
			{
				global.CataloguePages.set(i, new HashMap());
			}

			itemsCache = new HashMap();

			Tools.mysql.acquire(function(err, client){

				client.query('SELECT * FROM catalog_pages ORDER BY order_num', function(err, data){

					if(err) throw console.log(err);

					if(data.length > 1)
					{
						for(var i in data)
						{	
							this.page = new CatalogPage(data[i], itemsCache);
							console.log(this.page.getParentID());

							for(var i = this.page.getMinRank(); i <= MAX_RANKS; i++)
							{
								if(typeof global.CataloguePages.get(i) != undefined)
								{
									if(typeof global.CataloguePages.get(i).get(this.page.getParentID()) == undefined)
										global.CataloguePages.get(i).set(this.page.getParentID(), Array());
								}

								console.log(this.page.getParentID())
							}
						}

						PagesLoaded = true;
					}
				});

				client.query('SELECT * FROM catalog_items', function(err, data){
					
					if(err) throw console.log(err);

					if(data.length > 1)
					{
						for(var i in data)
						{
							if(data[i].item_ids == "" || data[i].amount <= 0)
								continue;

							item = new CatalogItem(data[i]);

							if(typeof itemsCache.get(item.pageID()) == undefined)
								itemsCache.set(item.pageID(), new HashMap());

							itemsCache.get(item.pageID()).set(item.itemID(), item);
						}

						ItemsLoaded = true;
					}
				});

				Tools.mysql.release(client);

				var VerifyLoad = setInterval(function(){

					if(ItemsLoaded && PagesLoaded){
						console.ImportantMessage('Catalogue '+ global.CataloguePages.length +' pages and '+ global.CatalogueItems.length + ' items successfull loaded!');
						clearInterval(VerifyLoad);
					}
					
				}, 100);
			});
		}

		this.Serialize = function(rank)
		{
			var Index = Object.create(Habbo.ServerMessage);
				Index.Header(Habbo.messages.outgoing.getCatalogDataComposer);
				Index.WriteBool(true);
				Index.WriteInt32(0);
				Index.WriteInt32(-1);
				Index.writeString("root");
				Index.writeString("");
				Index.WriteInt32(0);
				Index.WriteInt32(global.CataloguePages.get(rank).get(-1).length);

			subPages = Array();

			for(var i in global.CataloguePages.get(rank).get(-1))
			{
				if(global.CataloguePages.get(rank).get(this.page.getPageID()) != null)
					subPages = global.CataloguePages.get(rank).get(this.page.getPageID());
				
				this.page.SerializePage(rank, Index, subPages.length);

				for(var i in subPages)
				{
					subPages[i].Serialize(rank, Index, 0);
				}
			}

			Index.WriteBool(false);
			Index.WriteString("NORMAL");
			
			return Index;
		}
	}