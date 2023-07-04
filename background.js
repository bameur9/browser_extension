// Liste von verbotenen Begriffen
var blockedTerms = ["sexuell", "gewalttätig"];

// Ereignishandler für Web-Anfragen
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        for (var i = 0; i < blockedTerms.length; i++) {
            var term = blockedTerms[i];
            var regex = new RegExp("\\b" + term + "\\b", "gi");
            if (details.url.match(regex)) {
                return { cancel: true };
            }
        }
        return { cancel: false };
    }, { urls: ["<all_urls>"] }, ["blocking"]
);