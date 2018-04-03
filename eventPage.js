chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.task == 'openTabs') {
        // Runs in the background, opening tabs for each URL in array
        for (i = 0; i < msg.arr.length; i++) {
            chrome.tabs.create({url: msg.arr[i]});
        };
    }
});