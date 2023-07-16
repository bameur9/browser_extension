// Function to censor explicit content in a given node
function censorNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const words = [
            "drug",
            "fuck",
            "cocaine",
            "heroin",
            "prostitute",
            "gringo",
            "nigga",
            "gypsy",
        ];
        // Add more explicit words if needed

        for (const word of words) {
            const regex = new RegExp(`\\b${word}\\b`, "gi");
            if (regex.test(text)) {
                const censoredText = text.replace(regex, "*".repeat(word.length));
                const span = document.createElement("span");
                span.className = "censored";
                span.textContent = censoredText;
                node.parentNode.replaceChild(span, node);
                break;
            }
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        const childNodes = node.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            censorNode(childNodes[i]);
        }
    }
}

// Censor the entire document when it is ready
document.addEventListener("DOMContentLoaded", function() {
    const paragraphs = document.querySelectorAll("p");
    for (const paragraph of paragraphs) {
        censorNode(paragraph);
    }
});


// Function to observe mutations and censor added nodes
function observeMutations(mutations) {
    mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
                censorNode(node);
            });
        }
    });
}

// Censor the entire document when it is ready
censorNode(document.body);

// Create a new mutation observer to observe added nodes
const observer = new MutationObserver(observeMutations);
observer.observe(document.body, { childList: true, subtree: true });