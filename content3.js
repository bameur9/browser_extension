// Liste der unerwünschten Wörter mit ihren Kategorien
const unwantedContent = {
    "violences": ["violence", "knife", "blood", "gun", "shoot", "murder", "kill", "assassination", "kidnapping", "hijacking", "arson", "torture", "mass murder", "abuse"],
    "sexual_content": ["sex", "penis", "vagina", "sexual"],
    "drug_reference": ["heroin", "cocaine", "weed", "marijuana", "crack", "lsd", "mdma", "acid", "meth", "speed", "Cocaine DrugFacts"]
};

// Funktion zum Verbergen unerwünschter Inhalte und Anzeigen der Kategorien
function hideUnwantedContent() {
    const paragraphs = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, td, th, cite, span, em, title, a");

    for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        const text = paragraph.innerText.toLowerCase();
        let gefundenKategorien = [];

        for (const kategorie in unwantedContent) {
            const wörter = unwantedContent[kategorie];

            let kategorieGefunden = false;

            for (let j = 0; j < wörter.length; j++) {
                const unerwünschtesWort = wörter[j];
                const regex = new RegExp(`\\b${unerwünschtesWort}\\b`, "gi"); // Regex, um exakte Wörter zu finden

                if (regex.test(text)) {
                    console.log(unerwünschtesWort)
                    kategorieGefunden = true;
                    gefundenKategorien.push(kategorie);
                    break;
                }
            }

            if (kategorieGefunden) {
                break;
            }
        }

        if (gefundenKategorien.length > 0) {
            const block = document.createElement("div");
            block.classList.add("text-block");
            block.innerText = "Inhaltsblock";

            const block2 = document.createElement("div");
            block2.classList.add("inner-block");
            block2.innerText = "(key: " + gefundenKategorien.join(", ") + ")";
            console.log(gefundenKategorien)

            const block3 = document.createElement("button");
            block3.classList.add("button");
            block3.innerText = "View Content";
            block2.appendChild(block3);

            block.addEventListener("click", function() {
                block.appendChild(block2);
            });

            block3.addEventListener("click", function() {
                const zuVerbergendeBloecke = document.querySelectorAll(`.text-block.${gefundenKategorien.join(", ")}`);
                for (let k = 0; k < zuVerbergendeBloecke.length; k++) {
                    const zuVerbergenderBlock = zuVerbergendeBloecke[k];
                    zuVerbergenderBlock.style.display = "none";
                }
            });

            paragraph.parentNode.insertBefore(block, paragraph);
            block.classList.add(...gefundenKategorien);
        }
    }
}

// Aufruf der Funktion zum Verbergen unerwünschter Inhalte
hideUnwantedContent();