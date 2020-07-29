let tempCanvas = document.createElement('canvas');
let tempContext = tempCanvas.getContext('2d');

// Stop the pointer events to prevent accidental button clicking when picking a color
document.body.style['pointer-events'] = 'none';

function sendMessage(event) {
	chrome.runtime.sendMessage({message: 'capture'}, (currentScreen) => {
		let img = new Image();
		img.src = currentScreen.imgSrc;
		img.onload = function() {
			tempCanvas.width = img.naturalWidth;
			tempCanvas.height = img.naturalHeight;

			tempContext.drawImage(img, 0, 0);

			// Use pixel ratio to make sure it works on screens with very high resolutions like Retina
			getColor(event.clientX * window.devicePixelRatio, event.clientY * window.devicePixelRatio);
		}
	});
}

function getColor(x, y) {
	let pixel = tempContext.getImageData(x, y, 1, 1).data;
	let red = pixel[0];
	let green = pixel[1];
	let blue = pixel[2];
	console.log([red, green, blue]);

	var iframe = document.createElement('iframe');
	iframe.style.background = "green";
	iframe.style.height = "100%";
	iframe.style.width = "360px";
	iframe.style.position = "fixed";
	iframe.style.top = "0px";
	iframe.style.right = "0px";
	iframe.style.zIndex = "9000000000000000000";
	iframe.frameBorder = "none";

document.body.appendChild(iframe);
}

document.addEventListener("click", sendMessage, false);
