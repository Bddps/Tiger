	
	var HashMap = require('hashmap').HashMap;

	function CataloguePage(dataRow, items)
	{
		this.ID = dataRow.id;

		if(typeof items.get(this.ID) != undefined)
			this.items = items.get(this.ID);
		else
			this.items = new HashMap();

		this.parentID = dataRow.parent_id;
		this.pageName = dataRow.caption;
		this.iconImage = dataRow.icon_image;
		this.visible = (dataRow.visible == "1") ? true : false;
		this.enabled = (dataRow.enabled == "1") ? true : false;
		this.minRank = dataRow.min_rank;
		this.clubOnly = (dataRow.club_only == "1") ? true : false;
		this.layout = dataRow.page_layout;
		this.layoutHeadline = dataRow.page_headline;
		this.layoutTeaser = dataRow.page_teaser;
		this.layoutSpecial = dataRow.page_special;
		this.text1 = dataRow.page_text1;
		this.text2 = dataRow.page_text2;
		this.textDetails = dataRow.page_text_details;
		this.textTeaser = dataRow.page_text_teaser
		this.vipOnly = (dataRow.only_vip == "1") ? true : false;
	}


	function SerializePages(rank, message, counter)
    {
        message.WriteBool(this.visible);
        message.WriteInt32(this.iconImage);
        message.WriteInt32(this.ID);
        message.WriteString(this.pageName);
        message.WriteString(this.pageName);
        message.WriteInt32(items.length);

        for (var i in this.items)
            message.WriteInt32(this.items[i].itemID());

        message.WriteInt32(counter);
    }

	function getPageID()
	{
		return this.ID;
	}

	function getParentID()
	{
		return this.parentID;
	}

	function getMinRank()
	{
		return this.minRank;
	}

	function getPageName()
	{
		return this.pageName;
	}

	CataloguePage.prototype.getPageID = getPageID;
	CataloguePage.prototype.getParentID = getParentID;
	CataloguePage.prototype.getMinRank = getMinRank;
	CataloguePage.prototype.getPageName = getPageName;
	CataloguePage.prototype.SerializePage = SerializePages;

	module.exports = CataloguePage;