/**
 * In this version, a block has been added. When you click on it, it is removed.
 */

// List of undesirable words
const unwantedWords = ["violence", "suicide", "cocaine"];

// Function to hide content
function hideContent() {
    const paragraphs = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, td, th, cite, span, em");

    for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        const text = paragraph.innerText.toLowerCase();

        for (let j = 0; j < unwantedWords.length; j++) {
            const unwantedWord = unwantedWords[j];

            if (text.includes(unwantedWord)) {
                const block = document.createElement("div");
                block.classList.add("text-block");
                block.innerText = "Click to reveal content";

                block.style.padding = "10px";
                block.style.margin = "30px";
                block.style.width = "100%";
                block.style.minHeight = "100px";
                block.style.borderColor = "red";
                block.style.borderWidth = "thick";
                block.style.background = "#ccc";
                block.style.color = "#000";
                block.style.cursor = "pointer";

                // Klicken Sie, um den Inhalt zu sehen
                block.addEventListener("click", function() {
                    paragraph.style.display = "block";
                    block.style.display = "none";
                });

                paragraph.style.display = "none";
                paragraph.parentNode.insertBefore(block, paragraph);
                break;
            }
        }
    }

}
// Call the function when the page loads
hideContent();