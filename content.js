// Liste des mots indésirables
const motsIndesirables = ["sexuell", "Selbstmord"];

// Fonction pour masquer le contenu
function masquerContenu() {
    const paragraphes = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, td, th, cite, span, em");

    for (let i = 0; i < paragraphes.length; i++) {
        const paragraphe = paragraphes[i];
        const texte = paragraphe.innerText.toLowerCase();

        for (let j = 0; j < motsIndesirables.length; j++) {
            const motIndesirable = motsIndesirables[j];

            if (texte.includes(motIndesirable)) {
                const bloc = document.createElement("div");
                bloc.classList.add("texte-bloc");
                bloc.innerText = "Klicken Sie, um den Inhalt zu sehen";

                bloc.style.padding = "10px";
                bloc.style.margin = "30px";
                bloc.style.width = "100%";
                bloc.style.minHeight = "100px";
                bloc.style.borderColor = "red";
                bloc.style.borderWidth = "thick"
                bloc.style.background = "#ccc";
                bloc.style.color = "#000";
                bloc.style.cursor = "pointer";


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