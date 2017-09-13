function getAllTabs() {
    return new Promise(function (resolve, reject) {
        browser.tabs.query({
            currentWindow: true
        }).then((tabs) => {
            resolve(tabs)
        })
    })
}

function handleUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.url) {
        console.log("Tab: " + tabId +
            " URL changed to " + changeInfo.url);
    }
}