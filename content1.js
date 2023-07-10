// Liste des mots indésirables avec leurs catégories
const unwantedContent = {
    "violences": ["violence", "knife", "blood", "gun", "shoot", "murder", "kill", "assassination", "kidnapping", "hijacking", "arson", "torture", "mass murder", "abuse"],
    "sexual_content": ["sex", "penis", "vagina"],
    "drug_reference": ["heroin", "cocaine", "weed", "marijuana", "crack", "lsd", "mdma", "acid", "meth", "speed"]
};

function wordExists(text, word) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(text);
}

// Fonction pour masquer le contenu et afficher les catégories
function hideUnwantedContent() {
    const elements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, ul, ol, table");
    const bloc = document.createElement("div");
    bloc.classList.add("text-bloc");
    let keyFound = [];

    for (let i = 0; i < elements.length; i++) {
        const paragraph = elements[i];
        const text = paragraph.innerText.toLowerCase();
        let categoryFound = false;

        for (const category in unwantedContent) {
            const words = unwantedContent[category];

            for (let j = 0; j < words.length; j++) {
                const unwantedWord = words[j];

                if (wordExists(text, unwantedWord)) {
                    categoryFound = true;
                    if (!keyFound.includes(category)) {
                        keyFound.push(category);
                    }
                    break;
                }
            }

            if (categoryFound) {
                break;
            }
        }

        if (categoryFound) {
            paragraph.style.display = "none";
        } else {
            bloc.appendChild(paragraph.cloneNode(true));
        }
    }

    if (keyFound.length > 0) {
        const bloc2 = document.createElement("div");
        bloc2.classList.add("unter-bloc");
        bloc2.innerText = "key: " + keyFound.join(", ");
        bloc.appendChild(bloc2);

        bloc.addEventListener("click", function() {
            bloc2.style.display = "block";
        });

        bloc2.addEventListener("click", function() {
            bloc2.style.display = "none";
        });

        const parentElement = elements[0].parentNode;
        parentElement.insertBefore(bloc, parentElement.firstChild);
    }
}

// Appel de la fonction pour masquer le contenu
hideUnwantedContent();