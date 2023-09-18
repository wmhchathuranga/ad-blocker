var newDiv1 = document.createElement('div');
newDiv1.className = "timebucks-container";
newDiv1.id = "timebucks-container";
document.body.appendChild(newDiv1);

var newDiv2 = document.createElement('div');
newDiv2.textContent = 'Injected Div';
newDiv2.className = 'content';
newDiv1.appendChild(newDiv2);

newDiv1.style.display = "none";

if (localStorage.getItem('timebucks-bar') == 1) {
    newDiv1.style.display = "flex";
}