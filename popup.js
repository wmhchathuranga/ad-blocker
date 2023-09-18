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

if (localStorage.getItem('timebucks-bar') == 1) {
    document.querySelector('#enable3').setAttribute('checked', 'true');
}

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