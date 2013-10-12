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

		return tile;
	}

	var photos = getElems(document, "tiles");
	var length = photos.length;
	var idx;

	document.documentElement.className = "js";

	for( idx = 0; idx < length; ++idx) {
		addTiles(photos[idx]);
	}

	var throttle = function(ms, fn) {

		var last = 0;

		var throttled = function() {
			var now = Date.now();
			if (now - ms > last) {
				last = now;
				return fn.apply(this, arguments);
			}
		};

		return throttled;
	};
	var allTiles = document.getElementsByClassName('tiles');
	var getTiles = function(transition) {
		var getExiting = transition === 'exiting';
		var tiles = [];
		Array.prototype.forEach.call(allTiles, function(section) {
			var inViewport = elementInViewport(section);
			if ((getExiting && !inViewport) || (!getExiting && inViewport)) {
				tiles.push(section);
				return;
			}
		});

		return tiles;
	};

	/* elementInViewPort
	 * Given an element, return a number reflecting the percentage of the
	 * element that is contained within the viewpoirt.
	 *
	 * 0:       Element is completely outside viewport
	 * (0..1):  Element is partially inside viewport
	 * 1:       Element is completely inside viewport
	 *
	 * @param <Element> el - The DOM element to query.
	 * @return <Number>
	 */
	function elementInViewport(el) {
		var top = el.offsetTop;
		var height = el.offsetHeight || 0.0001;
		var bottom, viewBottom;

		while(el.offsetParent) {
			el = el.offsetParent;
			top += el.offsetTop;
		}
		top -= window.pageYOffset;
		bottom = top + height;
		viewBottom = window.innerHeight;

		if (bottom <= 0 || top > viewBottom) {
			return 0;
		}
		return (Math.min(viewBottom, bottom) - Math.max(0, top)) / height;
	}

	function showTiles(tiles) {
		tiles.forEach(function(tile) {
			tile.classList.add("flip-in-x");
		});
	}
	function hideTiles(tiles) {
		tiles.forEach(function(tile) {
			tile.classList.remove("flip-in-x");
		});
	}

	function showIframes() {
		var targets = document.getElementsByClassName("iframe-switch");
		Array.prototype.forEach.call(targets, function(elem) {
			var parent, iframe;

			if (!elementInViewport(elem)) {
				return;
			}
			parent = elem.parentNode;
			iframe = document.createElement("iframe");
			console.log(elem.getAttribute("href"));
			iframe.setAttribute("src", elem.getAttribute("href"));
			iframe.setAttribute("frameborder", 0);
			iframe.setAttribute("marginheight", 0);
			iframe.setAttribute("marginwidth", 0);
			parent.insertBefore(iframe, elem);
			parent.removeChild(elem);
		});
	}

	function handleScroll() {
		showTiles(getTiles());
		hideTiles(getTiles("exiting"));
		showIframes();
	}

	if (window.addEventListener) {
		window.addEventListener("scroll", throttle(300, handleScroll));
	}

}());
