// Klick-Event für den Unblock-Button
document.getElementById("unblock-button").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "unblock-content" });
    });
});