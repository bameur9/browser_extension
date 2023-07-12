// content.js

// List of unwanted content
const unwantedContent = {
    "violences": ["violence", "knife", "blood", "gun", "shoot", "murder", "kill", "assassination", "kidnapping", "hijacking", "arson", "torture", "mass murder", "abuse", "aggression"],
    "sexual_content": ["sex", "penis", "vagina", "sexual"],
    "drug_reference": ["heroin", "cocaine", "weed", "marijuana", "crack", "lsd", "mdma", "acid", "meth", "speed", "drugs"]
};

// Function to hide unwanted content
function hideUnwantedContent() {
    // Get all the text elements on the page
    const textElements = document.querySelectorAll('body *:not(script)');

    // Loop through each text element
    for (let element of textElements) {
        // Loop through each unwanted content category
        for (let category in unwantedContent) {
            // Get the list of words for the current category
            const words = unwantedContent[category];

            // Loop through each word in the category
            for (let word of words) {
                // Check if the word is present in the text element
                if (element.textContent.toLowerCase().includes(word)) {
                    // Create a new RegExp to match the word with word boundaries
                    const regex = new RegExp(`\\b${word}\\b`, 'gi');

                    // Replace the word with the same word wrapped in a <span> with text-decoration: line-through
                    element.innerHTML = element.innerHTML.replace(regex, `<span style="text-decoration: line-through;">${word}</span>`);
                }
            }
        }
    }
}

// Hide unwanted content when the page finishes loading
window.addEventListener('load', hideUnwantedContent);