// Hinzufügen der blockierten Begriffe zur Speicherung
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        blockedTerms: ["gewalttätig", "Selbstmord", "sexuell", "Krieg", "Beach"]
    });
});