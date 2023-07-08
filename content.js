// Liste des mots indésirables avec leurs catégories
const unwantedContent = {
    "violences": ["violence", "knife", "blood", "gun", "shoot", "murder", "kill", "assassination", "kidnapping", "hijacking", "arson", "torture", "mass murder", "abuse"],
    "sexual_content": ["sex", "penis", "vagina"],
    "drug_reference": ["heroin", "cocaine", "weed", "marijuana", "crack", "lsd", "mdma", "acid", "meth", "speed"]
};

// Fonction pour masquer le contenu et afficher les catégories
function hideUnwantedContent() {
    const paragraphs = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, td, th, cite, span, em, title, a");

    for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        const text = paragraph.innerText.toLowerCase();
        let categorysFound = [];

        for (const category in unwantedContent) {
            const words = unwantedContent[category];

            let categoryFound = false;

            for (let j = 0; j < words.length; j++) {
                const unwantedWord = words[j];
                if (text.includes(unwantedWord)) {
                    categoryFound = true;
                    categorysFound.push(category);
                    console.log(categorysFound)
                    break;
                }
            }

            if (categoryFound) {
                break;
            }
        }

        if (categorysFound.length > 0) {
            const bloc = document.createElement("div");
            bloc.classList.add("text-bloc");
            bloc.innerText = "Bloc Content";

            const bloc2 = document.createElement("div");
            bloc2.classList.add("unter-bloc");
            console.log(categorysFound);
            bloc2.innerText = "(key: " + categorysFound.join(", ") + ")";

            bloc.addEventListener("click", function() {
                bloc.appendChild(bloc2);
                //paragraph.style.display = "block";
                //bloc.style.display = "none";
            });

            bloc2.addEventListener("click", function() {
                paragraph.style.display = "block";
                bloc.style.display = "none";
                bloc2.style.display = "none";

            });


            paragraph.style.display = "none";
            paragraph.parentNode.insertBefore(bloc, paragraph);
        }
    }
}

// Appel de la fonction pour masquer le contenu
hideUnwantedContent();