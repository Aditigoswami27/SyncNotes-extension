console.log('event script loaded');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Message received in background script', request);

    if (request.todo === "getCurrentUrl") {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const currentTab = tabs[0];
            if (currentTab && currentTab.url) {
                console.log('Current URL:', currentTab.url);
                sendResponse({ url: currentTab.url });
            } else {
                sendResponse({ url: "#" });
            }
        });
        return true; // Indicates response is sent asynchronously
    }
});
