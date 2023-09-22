// Get the localstorage

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getLocalstorage
        },
            function (result) {
                var enable3Input = document.querySelector('#enable3');
                if (result[0]['result'])
                    enable3Input.setAttribute('checked', result[0]['result']);
                else
                    enable3Input.removeAttribute('checked');
            });
    } else {
        console.error("No active tabs found.");
    }
});


// showTimebucks bar toggler

document.getElementById('enable3').addEventListener('click', function () {
    var enable3Input = document.querySelector('#enable3');
    if (enable3Input && enable3Input.checked) {
        localStorage.setItem('timebucks-bar', 1);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: showTimebucksBar
                });
            } else {
                console.error("No active tabs found.");
            }
        });
    }
    else {
        localStorage.setItem('timebucks-bar', 0);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: hideTimebucksBar
                });
            } else {
                console.error("No active tabs found.");
            }
        });
    }
});


function showTimebucksBar() {
    localStorage.setItem('timebucks-bar', 1);
    let timbucks_bar = document.getElementById('timebucks-container');
    if (timbucks_bar)
        timbucks_bar.style.display = 'flex';
}

function hideTimebucksBar() {
    localStorage.setItem('timebucks-bar', 0);
    let timbucks_bar = document.getElementById('timebucks-container');
    if (timbucks_bar)
        timbucks_bar.style.display = 'none';
}

function getLocalstorage() {
    if (localStorage.getItem('timebucks-bar') == 1)
        return true;
    else
        return false;
}