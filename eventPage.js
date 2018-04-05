var thisId = chrome.runtime.id;
var basePath = 'blob:chrome-extension://' + thisId;
var openWindows = {};
var openDownloads = {};

chrome.downloads.onDeterminingFilename.addListener(function(downloadItem, suggest) {
    if (downloadItem.url.startsWith(basePath)) {
        suggest({filename: 'urls.txt'});
    } else {
        // this isn't our download
        suggest();
    }
    return true;
});

chrome.downloads.onCreated.addListener(function(downloadItem) {
    // console.log(downloadItem);
    
    if (!downloadItem.url.startsWith(basePath)) {
        console.log('this isnt our download');
        return;
    }
    
    openDownloads[downloadItem.id] = downloadItem.url;
});

chrome.downloads.onChanged.addListener(function(downloadItem) {
    // console.log(downloadItem);
    // downloadItem only returns filename and id, nothing else
    if (openDownloads[downloadItem.id]) {
        // this is one of our downloads
        var url = openDownloads[downloadItem.id];
        var windowId = openWindows[url];
        
        // Delete the keys from the object
        delete openDownloads[downloadItem.id];
        delete openWindows[url];
        
        // Since our download is started, close the window
        chrome.windows.remove(windowId);
        window.URL.revokeObjectURL(url);
    }
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.task == 'openTabs') {
        // Runs in the background, opening tabs for each URL in array
        for (i = 0; i < msg.arr.length; i++) {
            chrome.tabs.create({url: msg.arr[i]});
        };
    } else if (msg.task == 'saveFile') {
        // Workaround to download a .txt file containing the list of URLs
        var file = new Blob([JSON.stringify(msg.arr)], {type: 'plain/text'});
        var url = window.URL.createObjectURL(file);

        var createData = {url: url};

        chrome.windows.create(createData, function (newWindow) {
            openWindows[url] = newWindow.id;
        });
    }
});