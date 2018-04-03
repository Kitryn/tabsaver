# tabsaver
A basic Chrome browser extension for saving the URLs of the currently opened tabs to a plain text file, as well as loading them.

### Installation
Clone the repository to a local directory. Navigate to `chrome://extensions` in Chrome. Enable the "Developer mode" checkbox. Click "Load unpacked extension", and select the directory containing the cloned repository.

### Usage
![Interface preview](https://puu.sh/zVDrR/3f123bfa39.png)

tabsaver only saves the URLs of the tabs in the currently opened window. Click the extension icon, then "Save tabs". A download prompt will appear; save the resulting urls.txt file.

Clicking "Load tabs" brings up a file upload interface. Select your previously saved urls.txt file to open tabs for each URL contained in that file.

Close duplicates closes any tab in the current active window that has another tab with the exact same url.