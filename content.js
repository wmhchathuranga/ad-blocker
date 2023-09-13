var newDiv1 = document.createElement('div');
newDiv1.className = "timebucks-container"
document.body.appendChild(newDiv1);

var newDiv2 = document.createElement('div');
newDiv2.textContent = 'Injected Div';
newDiv2.className = 'content';
newDiv1.appendChild(newDiv2);