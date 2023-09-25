var newDiv1 = document.createElement('div');
newDiv1.className = "timebucks-container";
newDiv1.id = "timebucks-container";
document.body.appendChild(newDiv1);

var closeButton = document.createElement('span');
closeButton.id = "close-timebucks-bar";
closeButton.textContent = "x";

newDiv1.appendChild(closeButton);

var newDiv2 = document.createElement('div');
newDiv2.textContent = 'Unpaid Timebucks Earnings : 1523 pts';
newDiv2.className = 'content';
newDiv1.appendChild(newDiv2);

newDiv1.style.display = "none";

if (localStorage.getItem('timebucks-bar') == 1) {
    chrome.runtime.sendMessage({ timebucksBar: 1 });
    newDiv1.style.display = "flex";
}
else {
    chrome.runtime.sendMessage({ timebucksBar: 0 });
}

document.getElementById('close-timebucks-bar').addEventListener('click', function () {
    // Create the modal container
    var modal = document.createElement('div');
    modal.id = 'myModal';
    modal.className = 'modal';

    // Create the modal content
    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Create the close button
    var closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;';

    // Create modal title and content
    var modalTitle = document.createElement('h3');
    modalTitle.textContent = 'Would you like to disable the TimeBucks Earnings bar?';

    var modalText1 = document.createElement('button');
    modalText1.textContent = 'Disable for One Day';
    var modalText2 = document.createElement('button');
    modalText2.textContent = 'Disable for One Week';
    var modalText3 = document.createElement('button');
    modalText3.textContent = 'Disable for One Month';

    // Append elements to the modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalText1);
    modalContent.appendChild(modalText2);
    modalContent.appendChild(modalText3);
    modal.appendChild(modalContent);

    // Append the modal to the popup
    document.body.appendChild(modal);

    // Show the modal
    modal.style.display = 'block';

    // Add event listener to close the modal
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Add event listener to close the modal when clicking outside it
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

const delay = ms => new Promise(res => setTimeout(res, ms));

async function blockAdsOnPage() {
    // await delay(5);
    var ad_count = 0;
    fetch('http://localhost/serve.php')
        .then(response => response.text())
        .then(filterListText => {
            // Parse the filter list into an array of rules
            const filterRules = filterListText.split('\n');

            // Function to check if an element matches any filter rule
            function matchesFilter(element) {
                return filterRules.some(rule => {
                    // Split the rule into class names and an optional ID using '|'
                    const ruleParts = rule.split('|');
                    const classNames = ruleParts[0].trim();
                    const elementClassNames = element.className;
                    const elementId = element.id;

                    // Create a regex pattern to match any class name in the rule
                    const classPattern = new RegExp(`(?:^|\\s)${classNames}.*`);

                    // Check if the element's class names match the class pattern
                    const classMatch = classPattern.test(elementClassNames);

                    // Check if the element's ID matches the specified ID in the rule
                    const idMatch = classPattern.test(elementId);

                    // If either class names or ID match, return true
                    return classMatch || idMatch;
                    // return classMatch;
                });
            }

            // Function to remove matching elements
            function removeMatchingElements() {
                const allElements = document.querySelectorAll('*');
                allElements.forEach(element => {
                    if (matchesFilter(element)) {
                        element.remove();
                        ad_count++;
                    }
                });
                console.log("Ads Blocked : ", ad_count);
            }

            // Call the function to remove matching elements
            removeMatchingElements();
        });
    // alert(ad_count);
}

window.onload = blockAdsOnPage;
