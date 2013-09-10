(function() {
	"use strict";

	function skipIt(x) {
		var closeness = Math.min(x, 32 - x);
		if (closeness === 0) {
			return Math.random() < 0.4;
		} if (closeness === 1) {
			return false;
		}
		return ((-1/3)*closeness + (5/3)) < Math.random();
	}

	function addTiles(photo) {
		var x, y, tile, sum, diff;
		
		for (x = 0; x < 33; ++x) {
			for (y = 0; y < 33; ++y) {
				if (skipIt(x) && skipIt(y)) {
					continue;
				}
				tile = makeTile();
				tile.style.top = x*3 + "%";
				tile.style.left = y*3 + "%";
				photo.appendChild(tile);
			}
		}
	}

	function makeTile() {
		var tile = document.createElement("div");
		var num = Math.ceil(Math.random() * 5);
		tile.className = "tile animated tile-" + num;
		setTimeout(function() {
			tile.className += " flip-in-x";
		}, Math.random() * 1000);

		return tile;
	}


	var photos = document.getElementsByClassName("tiles");
	var length = photos.length;
	var idx;

	document.documentElement.className = "js";

	for( idx = 0; idx < length; ++idx) {
		addTiles(photos[idx]);
	}

}());
