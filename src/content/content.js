let tempCanvas = document.createElement('canvas');
let tempContext = tempCanvas.getContext('2d');

// Stop the pointer events (except for iframe) to prevent accidental button clicking when picking a color
for (let i = 0; i < children.length; i++) {
	if (children[i].id != 'droplyIframe') {
		children[i].style['pointer-events'] = 'none';
	}
}

// Listen for clicks on the page and call capturing once the event happens
document.addEventListener("click", captureCurrentPixel, false);

function captureCurrentPixel(e) {
	chrome.runtime.sendMessage({message: 'capture'}, (currentScreen) => {
		let img = new Image();
		img.src = currentScreen.imgSrc;
		img.onload = function() {
			tempCanvas.width = img.naturalWidth;
			tempCanvas.height = img.naturalHeight;

			tempContext.drawImage(img, 0, 0);

			// Use pixel ratio to make sure it works on screens with very high resolutions like Retina
			getColor(e.clientX * window.devicePixelRatio, e.clientY * window.devicePixelRatio);
		}
	});
}

function getColor(x, y) {
	let pixel = tempContext.getImageData(x, y, 1, 1).data;
	let red = pixel[0];
	let green = pixel[1];
	let blue = pixel[2];

	setupIframe(red, green, blue);
}
