void function() {
	var CHARS = {
		'left':  37,
		'up':    38,
		'right': 39,
		'down':  40
	};
	// listen to events from bg
	chrome.extension.onRequest.addListener(onRequest);

	function onRequest(msg) {
		var eventObj = document.createEvent("Events");
	    eventObj.initEvent(msg.type, true, true);

	    eventObj.keyCode = CHARS[msg.name];
	    eventObj.which = CHARS[msg.name];

	    window.dispatchEvent(eventObj);
	}
}();