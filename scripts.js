document.addEventListener('DOMContentLoaded', function() {
    var save = document.getElementById('save');
    var load = document.getElementById('load');
    var file = document.getElementById('file');
    
    // Load event listeners for buttons
    save.addEventListener('click', function() {
        getAllURLsFromWindow();
    });
    load.addEventListener('click', function() {
        document.form.file.click(event);
    });
    file.addEventListener('change', function() {
        loadArrayFromFile();
    });
});

function getAllURLsFromWindow() {
    var query = {
        currentWindow: true,
    };
    // Gets a list of tab URLS opened in the current window
    chrome.tabs.query(query, function(tabs) {
        var arrURLs = [];
        for (i = 0; i < tabs.length; i++) {
            arrURLs.push(tabs[i].url)
        };
        // debugShowOutput(JSON.stringify(arrURLs));
        writeArrayToFile(arrURLs)
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
        reader.readAsText(file)
    }
};

function loadAllURLsFromArray(arr) {
    // Javascript runtime ends early if run in menu.html; delegation to the eventPage (background script) required
    console.log("loadAllURLsFromArray running");
    chrome.runtime.sendMessage(arr);
};

function writeArrayToFile(arr) {
    window.URL = window.URL || window.webkitURL;
    
    // Workaround to download a .txt file containing the list of URLs
    var file = new Blob([JSON.stringify(arr)], {type: 'plain/text'});
    var url = window.URL.createObjectURL(file);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "urls.txt";
    a.click();
    window.URL.revokeObjectURL(url);
};

function debugShowOutput(info) {
    // Unused function for debugging purposes
    var output = document.getElementById('output');
    output.textContent = info;
};
