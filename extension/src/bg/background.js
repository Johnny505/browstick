// listen to tests.js events
chrome.extension.onRequest.addListener(onRequest);

// forward the data to inject.js
function onRequest(request, sender) {
	chrome.tabs.sendRequest(sender.tab.id, request);
}
