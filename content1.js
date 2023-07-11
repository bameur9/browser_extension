// Liste der unerwünschten Inhalte mit ihren Kategorien
const unwantedContent = {
    "violences": ["violence", "knife", "blood", "gun", "shoot", "murder", "kill", "assassination", "kidnapping", "hijacking", "arson", "torture", "mass murder", "abuse"],
    "sexual_content": ["sex", "penis", "vagina", "sexual"],
    "drug_reference": ["heroin", "cocaine", "weed", "marijuana", "crack", "lsd", "mdma", "acid", "meth", "speed"]
};

// Funktion zum Ausblenden des unerwünschten Inhalts
function hideUnwantedContent() {
    const paragraphs = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, td, th, cite, span, em, title, a");

    for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        const text = paragraph.innerText.toLowerCase();
        let categoriesFound = [];

        for (const category in unwantedContent) {
            const words = unwantedContent[category];
            let categoryFound = false;

            for (let j = 0; j < words.length; j++) {
                const unwantedWord = words[j];
                // const regex = new RegExp(`\\b${unwantedWord}\\b`, "gi"); // Regex zum Auffinden von exakten Wörtern

                if (text.includes(unwantedWord)) {
                    categoryFound = true;
                    categoriesFound.push(category);
                    break;
                }
            }

            if (categoryFound) {
                break;
            }
        }

        if (categoriesFound.length > 0) {
            const existingBlock = paragraph.parentNode.querySelector(".text-block");

            if (existingBlock) {
                existingBlock.classList.add(...categoriesFound);
                const innerBlock = existingBlock.querySelector(".inner-block");
                innerBlock.innerText += ", " + categoriesFound.join(", ");
            } else {
                const block = document.createElement("div");
                block.classList.add("text-block");
                block.classList.add(...categoriesFound);
                block.innerText = "Blocked Content";

                const innerBlock = document.createElement("div");
                innerBlock.classList.add("inner-block");
                innerBlock.innerText = "(key: " + categoriesFound.join(", ") + ")";

                const button = document.createElement("button");
                button.classList.add("button");
                button.innerText = "View Content";
                button.addEventListener("click", function() {
                    const parentBlock = button.parentNode.parentNode;
                    parentBlock.style.display = "none";
                });

                innerBlock.appendChild(button);
                block.appendChild(innerBlock);

                paragraph.parentNode.insertBefore(block, paragraph);
            }
        }
    }
}

// Aufruf der Funktion zum Ausblenden des unerwünschten Inhalts
hideUnwantedContent();