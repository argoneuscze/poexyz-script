// ==UserScript==
// @name       poexyz Script
// @namespace  http://www.argoneus.com
// @version    0.1
// @description  A script to improve the user experience at poexyz
// @match      *://poe.xyz.is/search/*
// @copyright  2014+, argoneus
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function injectPage() {
	// ADD CLIPBOARD
	$("span.requirements").each(function() {
		var obj = this;
		$(this).append(" · ");
		$(this).append($("<a id='clipboard' href='#'>Clipboard</a>").click(function() {
			var itemNameTag = $(obj).closest("tr.bottom-row").prev().find("td.item-cell h5 a");
			var itemName = $(itemNameTag).clone().children().remove().end().text().trim();
			var itemTable = $(obj).closest("tbody");
			var sellerName = $(itemTable).attr("data-seller");
			var itemPrice = $(itemTable).attr("data-buyout");
			if (itemPrice != "")
				GM_setClipboard("@" + sellerName + " Hello, I would like to buy your " + itemName + " for " + itemPrice + ".");
			else
				GM_setClipboard("@" + sellerName + " Hello, I would like to buy your " + itemName + ". What is your price?");			
			return false;
		}));
	});
	// ADD CLIPBOARD
}

setInterval(function() {
	if ($("#clipboard").length == 0) {
		injectPage();
	}
}, 1000);