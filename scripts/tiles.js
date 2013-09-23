(function() {
	"use strict";
	var fieldWidth = 20;
	var tailWidth = 20;
	var fullWidth = fieldWidth + tailWidth;
	var tileSize = 20;
	var height = 4;

	function skipIt(x, y) {
		if (x < fieldWidth) {
			if (x === -1 || y === 0 || y === height) {
				return Math.random() > 0.4;
			}
			return false;
		}
		return Math.random()*1.5 > (fullWidth - x) / tailWidth;
	}

	function addTiles(photo) {
		var frag = document.createDocumentFragment();
		var x, y, tile, sum, diff;
		
		for (x = fullWidth; x > -2; --x) {
			for (y = 0; y < height + 1; ++y) {
				if (skipIt(x, y)) {
					continue;
				}
				tile = makeTile();
				tile.style.right = x*tileSize + "px";
				tile.style.top = y*tileSize + "px";
				frag.appendChild(tile);
			}
		}

		photo.appendChild(frag);
	}

	function makeTile() {
		var tile = document.createElement("div");
		var num = Math.ceil(Math.random() * 4);
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
