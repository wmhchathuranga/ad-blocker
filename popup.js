document.getElementById('injectButton').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: injectDiv
            });
        } else {
            console.error("No active tabs found.");
        }
    });
});

function injectDiv() {
    // var newDiv = document.createElement('div');
    // newDiv.textContent = 'Injected Div!';
    // document.body.appendChild(newDiv);
}
