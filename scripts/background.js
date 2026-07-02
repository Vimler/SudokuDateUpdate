chrome.tabs.onCreated.addListener(() => {
  updateBookmark();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.pageLoaded) {
    updateBookmark();
  }
});

function getTodayString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
}

function updateBookmark() {
    const todayStr = getTodayString();
    const url = `https://sudokupad.com/nyt/${todayStr}medium`;

    chrome.bookmarks.search({ title: "sudokupad" }, (results) => {
        if (results.length === 0) {
            console.log("No bookmark found with title 'sudokupad'");
            return;
        }
        chrome.bookmarks.update(results[0].id, {
            url: url
        }, (bookmarkItem) => {
            console.log("Bookmark updated to URL:", url);
        });
    });
}
