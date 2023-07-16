/**
 * This version shows one of the finished versions. Scenario description.
1. The extension detects indented words and inserts the block.
2. A first click on the block displays the key concerned.
3. If the user wants to see the word, they click on view content.
4. After clicking, all the blocks with the same category disappear at the same time.
 */

//List of unwanted words with their categories
const unwantedContent = {
    "violences": ["violence", "knife", "blood", "gun", "shoot", "murder", "kill", "assassination", "kidnapping", "hijacking", "arson", "torture", "mass murder", "abuse"],
    "sexual_content": ["sex", "penis", "vagina", "sexual"],
    "drug_reference": ["heroin", "cocaine", "weed", "marijuana", "crack", "lsd", "mdma", "acid", "meth", "speed", "Cocaine DrugFacts"]
};

// Function to hide unwanted content and display categories
function hideUnwantedContent() {
    const paragraphs = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, td, th, cite, span, em, title, a");

    for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        const text = paragraph.innerText.toLowerCase();
        let foundCategories = [];

        for (const category in unwantedContent) {
            const words = unwantedContent[category];

            let categoryFound = false;

            for (let j = 0; j < words.length; j++) {
                const unwantedWord = words[j];
                const regex = new RegExp(`\\b${unwantedWord}\\b`, "gi"); // Regex to find exact words

                if (regex.test(text)) {
                    categoryFound = true;
                    foundCategories.push(category);
                    break;
                }
            }

            if (categoryFound) {
                break;
            }
        }

        if (foundCategories.length > 0) {
            const block = document.createElement("div");
            block.classList.add("text-block");
            block.innerText = "Content Blocked -> Click to view the Keys";

            const block2 = document.createElement("div");
            block2.classList.add("inner-block");
            block2.innerText = "(key: " + foundCategories.join(", ") + ")";
            console.log(foundCategories)

            const block3 = document.createElement("button");
            block3.classList.add("button");
            block3.innerText = "View Content";
            block2.appendChild(block3);

            block.addEventListener("click", function() {
                block.appendChild(block2);
            });

            block3.addEventListener("click", function() {
                const blocksToHide = document.querySelectorAll(`.text-block.${foundCategories.join(", ")}`);
                for (let k = 0; k < blocksToHide.length; k++) {
                    const blockToHide = blocksToHide[k];
                    blockToHide.style.display = "none";
                }
            });

            paragraph.parentNode.insertBefore(block, paragraph);
            block.classList.add(...foundCategories);
        }
    }

}

// Aufruf der Funktion zum Verbergen unerwünschter Inhalte
hideUnwantedContent();