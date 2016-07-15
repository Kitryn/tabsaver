chrome.runtime.onMessage.addListener(function(arr, sender, sendResponse) {
    // Runs in the background, opening tabs for each URL in array
    for (i = 0; i < arr.length; i++) {
        chrome.tabs.create({url: arr[i]});
    };
    // alert("message received");
});