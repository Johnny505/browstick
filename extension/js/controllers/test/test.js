void function() {
	var CHARS = {
			'up': 87, // w
			'left': 65, // a
			'right': 68, // d
			'down': 83, // s
			'fire': 32 // spacebar
		},
		charArr = [],
		lookUpMap = {};

	for (var k in CHARS) {
		charArr.push(CHARS[k]);
		lookUpMap[CHARS[k]] = k;
	}

	document.addEventListener('keyup', keyHandler);
	document.addEventListener('keydown', keyHandler);

	function keyHandler(evt) {
		// if one of the CHARS matches
		if (charArr.indexOf(evt.keyCode) !== -1) {
			// stop the event from getting to the page's event handler
			evt.stopPropagation();
			evt.preventDefault();

			// send the event to bg
			chrome.extension.sendRequest({
				'type': evt.type,
				'name': lookUpMap[evt.keyCode] // up, down, left, etc.
			});
		}
	};

}();