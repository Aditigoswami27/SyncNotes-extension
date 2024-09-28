console.log('Content script loaded');
chrome.runtime.sendMessage({todo: "getCurrentUrl"}, function(response) {
    console.log('Message sent to background script');
});
