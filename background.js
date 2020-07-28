chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.message == 'capture') {
		chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT, function(dataUrl) {
			sendResponse({imgSrc: dataUrl, message: 'done'});
			return true;
		});
	}
	return true;
  });
