/**
 * The first version of my code used stars (***) to block unwanted words listed in the web page content.
 */

// Liste von verbotenen Begriffen
var blockedTerms = ["violence", "cocaine", "selbstmord"];

// Funktion zum Ersetzen der blockierten Begriffe
function replaceBlockedTerms(node) {
    var childNodes = node.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        var childNode = childNodes[i];
        if (childNode.nodeType === Node.TEXT_NODE) {
            var content = childNode.textContent;
            console.log()
            for (var j = 0; j < blockedTerms.length; j++) {
                var term = blockedTerms[j];
                var regex = new RegExp("\\b" + term + "\\b", "gi");
                content = content.replace(regex, "****"); // Ersetze durch den Block
            }
            childNode.textContent = content;
        } else {
            replaceBlockedTerms(childNode); // Rekursiver Aufruf für verschachtelte Knoten
        }
    }
}

// Hauptfunktion zum Blockieren von Inhalten
function blockContent() {
    replaceBlockedTerms(document.body);
}

// Rufe die Hauptfunktion auf, wenn die Seite geladen wurde
blockContent();