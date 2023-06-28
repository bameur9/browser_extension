// change DOM content of the website after loading
document.addEventListener('DOMContentLoaded', function() {
    highlightWords('and', 'red');
});

function highlightWords(word, color) {
    document.body.innerHTML = document.body.innerHTML.replaceAll(word, "<span style='color: " + color + ";'>" + word + "</span>");
}

// document.getElementsByTagName("p")[0].innerHTML = document.getElementsByTagName("p")[0].innerHTML.replaceAll("and", "<span style='color: red;'>and</span>");