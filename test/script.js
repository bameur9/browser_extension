var violence = ["shooting","bombing"];
var phobias = ["spiders","frogs"];
var drugs = ["cocaine","mdma"];

var paragraphs;

document.addEventListener('DOMContentLoaded', function() {
    paragraphs = document.getElementsByTagName("p");
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
        if(text.includes("shooting") && p.style.blocked == "yes") {
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
            blocker.appendChild(document.createTextNode("This article contains violent content. Click to continue."));
        }
    }
}