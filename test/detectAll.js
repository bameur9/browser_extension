var violence = ["shooting","bombing"];
var phobias = ["spiders","frogs"];
var drugs = ["cocaine","mdma"];

var paragraphs;

//probably not a good idea to do it this way but it's past midnight and I'm tired
var currentCategory = "violence";

document.addEventListener('DOMContentLoaded', function() {
    //paragraphs = document.getElementsByTagName("p");

    paragraphs = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, td, th");

    for(let i = 0; i < paragraphs.length; i++) {
        let p = paragraphs[i];
        p.style.blocked = "yes";
    }
    censorPage();
});

window.onresize = function() {
    numberOfBlockers = document.getElementsByClassName("blocker").length;
    for(let i = 0; i < numberOfBlockers; i++){
        document.body.removeChild(document.getElementsByClassName("blocker")[0]);
    }
    censorPage();
};

function censorPage(){
    for(let i = 0; i < paragraphs.length; i++) {
        let p = paragraphs[i];
        let text = p.innerText;
        if(includesWord(text) && p.style.blocked == "yes") {
            let position = p.getBoundingClientRect();
            let blocker = document.createElement("div");
            blocker.style.position = "absolute";
            blocker.style.top = position.top;
            blocker.style.left = position.left;
            blocker.style.width = position.width;
            blocker.style.height = position.height;
            blocker.style.backgroundColor = "black";
            blocker.style.color = "white";
            blocker.style.zIndex = "100";
            blocker.onclick = function() {
                document.body.removeChild(blocker);
                p.style.blocked = "no";
            };
            blocker.className = "blocker";
            document.body.appendChild(blocker);
            blocker.appendChild(document.createTextNode("This section contains words on your list '" + currentCategory + "'. Click to show."));
        }
    }
}

function includesWord(text) {
    text = text.toLowerCase();
    for(let i = 0; i < violence.length; i++) {
        if(text.includes(violence[i])) {
            currentCategory = "violence";
            return true;
        }
    }
    for(let i = 0; i < phobias.length; i++) {
        if(text.includes(phobias[i])) {
            currentCategory = "phobias";
            return true;
        }
    }
    for(let i = 0; i < drugs.length; i++) {
        if(text.includes(drugs[i])) {
            currentCategory = "drugs";
            return true;
        }
    }
    return false;
}