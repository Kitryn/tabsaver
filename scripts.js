document.addEventListener('DOMContentLoaded', function() {
    var save = document.getElementById('save');
    var load = document.getElementById('load');
    var file = document.getElementById('file');
    var closeDupes = document.getElementById('closeDupes');
    
    // Load event listeners for buttons
    save.addEventListener('click', function() {
        getAllURLsFromWindow();
    });
    load.addEventListener('click', function() {
        document.form.file.click(event);
    });
    closeDupes.addEventListener('click', function() {
        closeDuplicateTabs();
    });
    file.addEventListener('change', function() {
        loadArrayFromFile();
    });
});

function closeDuplicateTabs() {
    // console.log('closeDuplicateTabs running');
    var query = {
        currentWindow: true,
    };
    
    // Get a list of tab URLs opened in the current window
    chrome.tabs.query(query, function(tabs) {
        var arrURLs = [];
        for (var i = 0; i < tabs.length; i++) {
            // tabs[i].id shows the id of the tab
            // tabs[i].url shows the url of the tab
            if (arrURLs.indexOf(tabs[i].url) < 0) {
                // new unique tab, add it to the list of tabs
                arrURLs.push(tabs[i].url);
            } else {
                // another tab with the same url already exists
                // close the current tab
                console.log('Removing tab with url ' + tabs[i].url);
                chrome.tabs.remove(tabs[i].id, function() {
                    // pass
                });
            };
        };
    });
};

function getAllURLsFromWindow() {
    var query = {
        currentWindow: true,
    };
    // Gets a list of tab URLS opened in the current window
    chrome.tabs.query(query, function(tabs) {
        var arrURLs = [];
        for (var i = 0; i < tabs.length; i++) {
            const splitText = 'data:text/html,<title>';

            if (tabs[i].url.startsWith(splitText)) {
                const realTabUrl = tab.url.replace(splitText, '');
                arrURLs.push(realTabUrl);
            } else {
                arrURLs.push(tabs[i].url);
            }
        };
        // debugShowOutput(JSON.stringify(arrURLs));
        writeArrayToFile(arrURLs);
    });
};

function loadArrayFromFile() {
    console.log("loadArrayFromFile running");
    var file = document.getElementById('file').files[0];
    if (file) {
        var reader = new FileReader();
        
        // Async function to call loadAllURLsFromArray after the reader is done reading
        reader.onload = function(e) {
            console.log("FileReader load complete");
            console.log(e.target.result);
            loadAllURLsFromArray(JSON.parse(e.target.result))
        };
        
        // Init the FileReader
        reader.readAsText(file);
    }
};

function loadAllURLsFromArray(arr) {
    // Javascript runtime ends early if run in menu.html; delegation to the eventPage (background script) required
    console.log("loadAllURLsFromArray running");
    chrome.runtime.sendMessage({task: 'openTabs', arr: arr});
};

function writeArrayToFile(arr) {
    window.URL = window.URL || window.webkitURL;
    
    chrome.runtime.sendMessage({task: 'saveFile', arr: arr});    
};

function debugShowOutput(info) {
    // Unused function for debugging purposes
    var output = document.getElementById('output');
    output.textContent = info;
};
