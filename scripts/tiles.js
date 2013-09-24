(function() {
	"use strict";
	var fieldWidth = 20;
	var tailWidth = 20;
	var fullWidth = fieldWidth + tailWidth;
	var tileSize = 20;
	var fieldHeight = 3;
	var tailHeight = 6;
	var fullHeight = fieldHeight + tailHeight;

	var getElems;
	if (document.getElementsByClassName) {
		getElems = function(element, className) {
			return Array.prototype.slice.call(
				element.getElementsByClassName(className)
			);
		};
	} else {
		getElems = function(element, className) {
			var classRe = new RegExp('(?:^|\\s)' + className + '(?:\\s|$)');
			var allElems = element.getElementsByTagName("*");
			var len = allElems.length;
			var elems = [];
			var elem, idx;

			for (idx = 0; idx < len; ++idx) {
				elem = allElems[idx];
				if (classRe.test(elem.className)) {
					elems.push(elem);
				}
			}

			return elems;
		};
	}
	function skipIt(x, y) {
		if (x < fieldWidth && y < fieldHeight) {
			if (x === -1 || y === 0) {
				return Math.random() > 0.4;
			}
			return false;
		}
		return Math.random()*1.5 > (fullWidth - x) * (fullHeight - y) / (tailWidth * tailHeight);
	}

	function addTiles(photo) {
		var frag = document.createDocumentFragment();
		var x, y, tile, sum, diff;
		
		for (x = fullWidth; x > -2; --x) {
			for (y = 0; y < fullHeight; ++y) {
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


	var photos = getElems(document, "tiles");
	var length = photos.length;
	var idx;

	document.documentElement.className = "js";

	for( idx = 0; idx < length; ++idx) {
		addTiles(photos[idx]);
	}

}());
