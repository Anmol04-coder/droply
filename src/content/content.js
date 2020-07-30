let tempCanvas = document.createElement('canvas');
let tempContext = tempCanvas.getContext('2d');

// Stop the pointer events to prevent accidental button clicking when picking a color
document.body.style['pointer-events'] = 'none';

let iframe = document.createElement('iframe');
let iframeDocument;
setupIframe(0, 0, 0);

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

	document.body.style['pointer-events'] = 'auto';
}

function setupIframe(r, g, b) {
	iframe.onload = function() {
		iframe.style.background = "#EEEEEE";
		iframe.style.height = "50%";
		iframe.style.width = "180px";
		iframe.style.position = "fixed";
		iframe.style.top = "0px";
		iframe.style.right = "0px";
		iframe.style.zIndex = "1000000000";
		iframe.frameBorder = "none";

		iframeDocument = iframe.contentDocument;

		showClose();
		showRect(r, g, b);
		showParagraph(`RGB: (${r}, ${g}, ${b})`);
		showParagraph(`HEX: ${rgbToHex(r, g, b)}`);
		showParagraph(`HSL: ${rgbToHsl(r, g, b)}`);

		iframeDocument.body.style.fontFamily = 'Open Sans';
		iframeDocument.body.style.fontWeight = '200';
    iframeDocument.body.style.color = '#333333';
		iframeDocument.body.style.paddingLeft = "10px";
		iframeDocument.body.style.overflow = "hidden";
	}
	document.body.appendChild(iframe);
}

function showClose() {
	let closeButton = iframeDocument.createElement("p");
	let closeSymbol = iframeDocument.createTextNode("✕");
	closeButton.style.textAlign = "right";
	closeButton.onclick = stopExtension;
	closeButton.appendChild(closeSymbol);

	iframeDocument.body.appendChild(closeButton);
}

function showRect(r, g, b) {
	let c = iframeDocument.createElement('canvas');
	let ctx = c.getContext("2d");

	ctx.beginPath();
	ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
	ctx.rect(10, 10, 100, 100);
	ctx.rect.lineWidth = "5px";
	ctx.rect.strokeStyle = "black";
	ctx.stroke();
	ctx.fill();

	iframeDocument.body.appendChild(c);
}

function showParagraph(text) {
	let paragraph = iframeDocument.createElement("p");
	let textElement = iframeDocument.createTextNode(text);
	paragraph.appendChild(textElement);

	iframeDocument.body.appendChild(paragraph);
}

function stopExtension() {
	iframe.parentNode.removeChild(iframe);
}
