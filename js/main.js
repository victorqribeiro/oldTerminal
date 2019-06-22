let u, menus = document.getElementsByClassName('content'),
	mc = document.getElementById('main_content'),
	buffer,
	x = 0;

function menu(e) {
	if (!e) {
	  buffer = document.getElementById('init_page').textContent;
	  typeWrite();
	  return;
	}
	let content,
	  choice = e.target.parentElement;
	for (let i = 0; i < menus.length; i++) {
	  menus[i].style.visibility = "hidden";
	}
	content = document.getElementById(choice.id + "_content");
	if (content) {
	  content.style.top = choice.style.top;
	  content.style.left = choice.style.left;
	  content.style.visibility = "visible";
	  return;
	}
	content = document.getElementById(choice.id + "_page");
	if (content) {
	  buffer = content.textContent;
	  if(u){
			clearTimeout(u);
		}
	  typeWrite();
	}
}

function typeWrite() {
	msg = buffer;
	x = 0;
	mc.innerHTML = "";
	mc.style.whiteSpace = "pre-wrap";
	mc.style.wordBreak = "break-all";
	u = setInterval(() => {
	  if (x >= msg.length) {
	    clearInterval(u);
	  }
	  mc.textContent += msg[x] ? msg[x] : "";
	  x++;
	}, 50);
}

function drawMouse() {
	let canvas = document.createElement('canvas');
	canvas.width = 20;
	canvas.height = 28;
	let c = canvas.getContext('2d');
	c.fillStyle = window.getComputedStyle(mc).getPropertyValue("caret-color");
	c.shadowColor = window.getComputedStyle(mc).getPropertyValue("caret-color");
	c.shadowBlur = 5;
	c.fillRect(3, 3, 14, 23);
	let url = canvas.toDataURL();
	document.body.style.cursor = "url("+url+") 10 14, auto";
}

document.addEventListener('click', menu);

drawMouse();

window.onload = () => menu();
