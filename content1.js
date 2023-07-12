// Liste des mots indésirables avec leurs catégories
const unwantedContent = {
    "violences": ["violence", "knife", "blood", "gun", "shoot", "murder", "kill", "assassination", "kidnapping", "hijacking", "arson", "torture", "mass murder", "abuse"],
    "sexual_content": ["sex", "penis", "vagina", "sexual"],
    "drug_reference": ["heroin", "cocaine", "weed", "marijuana", "crack", "lsd", "mdma", "acid", "meth", "speed", ""]
};

// Fonction pour masquer le contenu et afficher les catégories
function hideUnwantedContent() {
    const paragraphs = document.querySelectorAll("*");

    for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        const text = paragraph.textContent.toLowerCase();
        let categoryFound = null;

        for (const category in unwantedContent) {
            const words = unwantedContent[category];

            for (let j = 0; j < words.length; j++) {
                const unwantedWord = words[j];
                const regex = new RegExp(`\\b${unwantedWord}\\b`, "gi"); // Regex pour trouver des mots exacts
                console.log(unwantedWord);

                if (regex.test(text)) {
                    categoryFound = category;
                    break;
                }
            }

            if (categoryFound) {
                break;
            }
        }

        if (categoryFound !== null) {
            const bloc = document.createElement("div");
            bloc.classList.add("text-block");
            bloc.innerText = "Bloc Content";

            const bloc2 = document.createElement("div");
            bloc2.classList.add("inner-block");
            bloc2.innerText = "(key: " + categoryFound + ")";

            const bloc3 = document.createElement("button");
            bloc3.classList.add("button");
            bloc3.innerText = "View Content";
            bloc2.appendChild(bloc3);

            bloc.addEventListener("click", function() {
                bloc.appendChild(bloc2);
            });

            bloc3.addEventListener("click", function() {
                const blocsToHide = document.querySelectorAll(`.text-block.${categoryFound}`);
                for (let k = 0; k < blocsToHide.length; k++) {
                    const blockToHide = blocsToHide[k];
                    blockToHide.style.display = "none";
                }
            });

            paragraph.parentNode.insertBefore(bloc, paragraph);
            bloc.classList.add(categoryFound);
        }
    }
}

// Appel de la fonction pour masquer le contenu
hideUnwantedContent();