const buildSafeArray = () => {
    //...
    var saveArray = [];
    var element = document.querySelectorAll('.keyword-row');
    for (var i = 0; i < element.length; i++) {
        var obj = {};
        obj.keyword = element[i].querySelector('.keyword input').value;
        obj.type = element[i].querySelector('.type select').value;
        if (obj.keyword != '') {
            saveArray.push(obj);
        }
    }

    saveOptions(saveArray);
}


// Saves options to chrome.storage
const saveOptions = (saveArray) => {

    chrome.storage.sync.set({
        keywordsArray: saveArray
    },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        {
            keywordsArray: []
        },
        (items) => {
            buildOptDisplay(items.keywordsArray);
            //createListeners();
        }
    );
};

const buildOptDisplay = (items) => {
    if (items.length == 0) {
        document.querySelector('.add-keyword').click();
    }
    for (var i = 0; i < items.length; i++) {
        if (typeof items[i] === 'object') {
            createRowWithOptions(items[i], i);
        }

    }
}

const createRowWithOptions = (obj, int = 0) => {

    var keywordRow = document.querySelector('.keyword-row').innerHTML;
    if (typeof document.querySelector('.keyword-row').dataset.id === 'undefined') {
        document.querySelector('.keyword-row').remove();
    }

    var newRow = document.createElement('div');
    newRow.className = 'keyword-row';
    var timestamp = (Date.now() + int);
    newRow.dataset.id = timestamp;
    newRow.innerHTML = keywordRow;
    document.querySelector('.keywords-holder').appendChild(newRow);

    var newEle = document.querySelector('.keywords-holder .keyword-row[data-id="' + timestamp + '"]');
    newEle.querySelector('.keyword input').value = obj.keyword;
    newEle.querySelector('.type select').value = obj.type;

    newEle.querySelector('.type select').addEventListener('change', function (e) {
        if (e.target.value == '0') {
            //something
        }
    })

}

//add listener to keyword button
document.querySelector('.add-keyword').addEventListener('click', function () {
    var obj = {};
    obj.keyword = 'example';
    obj.type = '1';
    createRowWithOptions(obj);
})

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', buildSafeArray);