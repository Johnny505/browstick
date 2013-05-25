void function() {
	var CHARS = {
			'up': 87, // w
			'left': 65, // a
			'right': 68, // d
			'down': 83, // s
			'fire': 32 // spacebar
		},
		charArr = [],
		lookUpMap = {},
		websocket = new WS({
			'host': 'ws://localhost:12345'
		});

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

			websocket.send({
				'type': evt.type,
				'name': lookUpMap[evt.keyCode] // up, down, left, etc.
			});
		}
	};

	function WS(cfg) {
		var soc = new WebSocket(cfg.host);

		console.log(soc.readyState);

		soc.onopen = function () {
		  	console.log(connection.readyState);
		  	connection.send('Ping');
		};

		soc.onerror = function (error) {
		  	console.log('WebSocket Error ' + error);
		};

		soc.onmessage = function (e) {
			console.log('Server: ' + e.data);
		};

		this.send = function(msg) {
			msg = JSON.stringify(msg);
			connection.send(msg);
		};
	};
}();