/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// ==UserScript==
// @name       poexyz Script
// @namespace  http://www.argoneus.com
// @version    0.13
// @description  A script to improve the user experience at poexyz
// @match      *://poe.xyz.is/search/*
// @copyright  2014+, argoneus
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @grant GM_setClipboard
// @downloadURL https://github.com/argoneuscze/poexyz-script/raw/stable/poexyz_script.user.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function injectPage() {
	// ADD CLIPBOARD
	$("span.requirements").each(function() {
		var obj = this;
		$(this).append(" · ");
		$(this).append($("<a id='clipboard' href='#'>Clipboard</a>").click(function() {
			var sellerNameTag = $(obj).clone().children().remove().end().text();
			var sellerName = /^.*IGN:\s*(\S*).*$/g.exec(sellerNameTag)[1];
			var firstLine = $(obj).closest("tr.bottom-row").prev();
			var itemNameTag = $(firstLine).find("td.item-cell h5 a");
			var itemName = $(itemNameTag).clone().children().remove().end().text().trim();
			var itemTable = $(obj).closest("tbody");
			var itemPrice = $(itemTable).attr("data-buyout");
			var gemQuality = $(firstLine).find("span.gem-quality").first().text();
			if (gemQuality != "" && parseInt(gemQuality) > 0)
				itemName = itemName + " (" + gemQuality + " quality)";
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