void function() {
	var CHARS = {
			'left':  37,
			'up':    38,
			'right': 39,
			'down':  40
		},
		websockets = new WS({
			'host': 'ws://localhost:12345'
		});

	function onRequest(msg) {
		var eventObj = document.createEvent("Events");
	    eventObj.initEvent(msg.type, true, true);

	    eventObj.keyCode = CHARS[msg.name];
	    eventObj.which = CHARS[msg.name];

	    console.log(CHARS[msg.name]);

	    window.dispatchEvent(eventObj);
	}

	function WS(cfg) {
		var soc = new WebSocket(cfg.host);

		soc.onopen = function () {
		  	connection.send('Ping');
		};

		soc.onerror = function (error) {
		  	console.log('WebSocket Error ' + error);
		};

		soc.onmessage = function (e) {
			console.log('Server: ' + e.data);

			var data;
			try {
				data = JSON.parse(e.data);
			}
			catch(err) {}

			if (data) {
				onRequest(data);
			}
		};
	};
}();