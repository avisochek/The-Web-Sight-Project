var portsByTabId = {};

chrome.self.onConnect.addListener(function(port) {
  console.log("got port: " + port.tab.id);
  portsByTabId[port.tab.id] = port;
});

// TODO(aa): Remove ports from the list when ports support an onclose event.

function sendMessageToTab(tabId, message) {
  var port = portsByTabId[tabId];
  if (!port) throw new Error("Could not find a port for tab id: " + tabId);
  port.postMessage(message);
}

function sendMessageToOpenTab(message) {
  chrome.tabs.getSelected(null, function(tab) {
    sendMessageToTab( tab.id, message );
  });
}
