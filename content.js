chrome.storage.sync.get(
    {
        keywordsArray: []
    },
    (items) => {
        blockPageContent(items.keywordsArray);
    }
);

const blockPageContent = (keywordsArray) => {
    //...
    for (var i = 0; i < keywordsArray.length; i++) {
        blockContent(keywordsArray[i]);
    }
}

const blockCompletely = (position) => {
    var blocker = document.createElement("div");
    blocker.style.position = 'absolute'
    blocker.style.top = position.top;
    blocker.style.left = position.left;
    blocker.style.width = position.width;
    blocker.style.height = position.height;
    blocker.style.backgroundColor = "black";
    blocker.style.color = "white";
    blocker.style.zIndex = "100";
    blocker.onclick = function () {
        document.body.removeChild(blocker);
    };
    blocker.className = "blocker";
    blocker.innerHTML = 'blocked, click to unblock'
    document.body.appendChild(blocker);
}

const blockContent = (obj) => {
    var allElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, a, caption, div, section, article, span, td, li, ul');
    for (var i = 0; i < allElements.length; i++) {
        if (allElements[i].textContent.toLowerCase().includes(obj.keyword.toLowerCase())) {
            if (obj.type == '0') {
                //block completely
                //!!green text for now!!
                allElements[i].style.color = 'green';

                var position = allElements[i].getBoundingClientRect();

                var blocker = document.createElement("div");
                blocker.style.position = 'absolute'
                blocker.style.top = position.top;
                blocker.style.left = position.left;
                blocker.style.width = position.width;
                blocker.style.height = position.height;
                blocker.style.backgroundColor = "black";
                blocker.style.color = "white";
                blocker.style.zIndex = "100";
                blocker.onclick = function () {
                    document.body.removeChild(blocker);
                };
                blocker.className = "blocker";
                blocker.innerHTML = 'blocked, click to unblock'

                //allElements[i].innerHTML = allElements[i].innerHTML.replace(allElements[i].innerHTML, blocker);
                blockCompletely(position);
            } else if (obj.type == '1') {
                //show detected keywords
            } else if (obj.type == '2') {
                //show detected category
            }
        }
    }
}