// Liste des mots indésirables
const motsIndesirables = ["sexuell", "gewalttätig"];

// Fonction pour masquer le contenu
function masquerContenu() {
    const paragraphes = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, td, th");

    for (let i = 0; i < paragraphes.length; i++) {
        const paragraphe = paragraphes[i];
        const texte = paragraphe.innerText.toLowerCase();

        for (let j = 0; j < motsIndesirables.length; j++) {
            const motIndesirable = motsIndesirables[j];

            if (texte.includes(motIndesirable)) {
                const bloc = document.createElement("div");
                bloc.classList.add("texte-bloc");
                bloc.innerText = "Cliquez pour afficher le contenu";

                bloc.addEventListener("click", function() {
                    paragraphe.style.display = "block";
                    bloc.style.display = "none";
                });

                paragraphe.style.display = "none";
                paragraphe.parentNode.insertBefore(bloc, paragraphe);
                break;
            }
        }
    }
}

// Appel de la fonction au chargement de la page
masquerContenu();